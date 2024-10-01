import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { DevicesService } from './device.service';
import { Device } from './device.schema';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('add')
  async addDevice(@Body() deviceData: Partial<Device>): Promise<Device> {
    return this.devicesService.addDevice(deviceData);
  }

  @Get('user/:open_id')
  async getDevicesByUser(@Param('open_id') open_id: string): Promise<Device[]> {
    return this.devicesService.getDevicesByUser(open_id);
  }

  @Patch('status/:device_id')
  async updateDeviceStatus(
    @Param('device_id') device_id: string,
    @Body('status') status: string,
  ): Promise<Device> {
    return this.devicesService.updateDeviceStatus(device_id, status);
  }

  @Patch('sync/:device_id')
  async updateLastSync(@Param('device_id') device_id: string): Promise<Device> {
    return this.devicesService.updateLastSync(device_id);
  }
}
