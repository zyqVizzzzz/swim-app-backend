import { Controller, Get, Param } from '@nestjs/common';
import { SolanaService } from './solana.service';

@Controller('solana')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}

  @Get()
  findAll() {
    return 'hello';
  }

  @Get('fetch-info/:tokenId')
  async fetchInfo(@Param('tokenId') tokenId: string) {
    console.log(tokenId);
    return this.solanaService.fetchCurrentTopInfo(tokenId);
  }
}
