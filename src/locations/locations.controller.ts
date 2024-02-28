import { Controller, Get } from '@nestjs/common';
import { LocationService } from './locations.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('provinces')
  getProvinces() {
    return this.locationService.getProvinces();
  }

  // 其他API接口
}
