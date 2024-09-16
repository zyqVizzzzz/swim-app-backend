import { Injectable } from '@nestjs/common';
import { Connection, PublicKey } from '@solana/web3.js';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMotherData, MotherData } from './motherData.schema';
import { IToken, Token } from './token.schema';

@Injectable()
export class SolanaService {
  private connection: Connection;

  constructor(
    @InjectModel(MotherData.name) private motherDataModel: Model<IMotherData>,
    @InjectModel(Token.name) private tokenModel: Model<IToken>,
    private readonly configService: ConfigService,
  ) {
    const QUICKNODE_RPC = this.configService.get<string>('QUICK_NODE_RPC');
    this.connection = new Connection(QUICKNODE_RPC);
  }

  async fetchSolanaTokenPrice(tokenAddress: string): Promise<number | null> {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/solana/contract/${tokenAddress}`;
      const response = await axios.get(url);
      if (response.data) {
        return response.data.market_data.current_price.usd;
      }
    } catch (error) {
      console.error('Error fetching token price:', error);
      return null;
    }
  }

  async getTopHolders(tokenAddress: PublicKey, limit = 30) {
    try {
      const tokenAccounts =
        await this.connection.getTokenLargestAccounts(tokenAddress);
      return tokenAccounts.value.slice(0, limit).map((accountInfo) => ({
        address: accountInfo.address.toBase58(),
        amount: parseFloat(accountInfo.amount) / 1000000,
      }));
    } catch (error) {
      console.error('Error fetching top holders:', error);
      return [];
    }
  }

  async getTokenSupply(tokenAddress: PublicKey) {
    try {
      const tokenSupply = await this.connection.getTokenSupply(tokenAddress);
      return tokenSupply.value.uiAmount;
    } catch (error) {
      console.error('Error fetching token supply:', error);
      return 0;
    }
  }

  async calculateTopHoldersPercentageToday(tokenAddress: PublicKey) {
    const topHolders = await this.getTopHolders(tokenAddress);
    const totalSupply = await this.getTokenSupply(tokenAddress);

    if (totalSupply === 0) {
      console.error('Total supply is zero or not fetched correctly');
      return 'NaN';
    }

    const topHoldersBalance = topHolders.reduce(
      (sum, holder) => sum + holder.amount,
      0,
    );
    return ((topHoldersBalance / totalSupply) * 100).toFixed(2);
  }

  async fetchCurrentTopInfo(tokenId: string) {
    const token = await this.tokenModel.findById(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }
    const publicKey = new PublicKey(token.address);
    const percentage = await this.calculateTopHoldersPercentageToday(publicKey);
    const currentPrice = await this.fetchSolanaTokenPrice(publicKey.toString());

    if (currentPrice && percentage && parseInt(percentage) > 0) {
      const newData = new this.motherDataModel({
        token: token._id,
        percentage: percentage + '%',
        date: new Date(),
        currentPrice,
      });

      await newData.save();
      return newData;
    }
  }
}
