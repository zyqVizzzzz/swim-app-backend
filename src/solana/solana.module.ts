import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolanaController } from './solana.controller';
import { SolanaService } from './solana.service';
import { Token, TokenSchema } from './token.schema';
import { MotherData, MotherDataSchema } from './motherData.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([
      { name: MotherData.name, schema: MotherDataSchema },
    ]),
  ],
  controllers: [SolanaController],
  providers: [SolanaService],
  exports: [SolanaService],
})
export class SolanaModule {}
