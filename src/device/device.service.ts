import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './device.schema';

@Injectable()
export class DevicesService {
  constructor(@InjectModel('Device') private deviceModel: Model<Device>) {}

  // add a new device
  async addDevice(deviceData: Partial<Device>): Promise<Device> {
    const newDevice = new this.deviceModel(deviceData);
    return await newDevice.save();
  }

  // get devices by openId
  async getDevicesByUser(open_id: string): Promise<Device[]> {
    return await this.deviceModel.find({ open_id }).exec();
  }

  // update device status
  async updateDeviceStatus(device_id: string, status: string): Promise<Device> {
    return await this.deviceModel
      .findOneAndUpdate(
        { device_id },
        { device_status: status, updated_at: new Date() },
        { new: true },
      )
      .exec();
  }

  //update last sync time
  async updateLastSync(device_id: string): Promise<Device> {
    return await this.deviceModel
      .findOneAndUpdate(
        { device_id },
        { last_sync: new Date(), updated_at: new Date() },
        { new: true },
      )
      .exec();
  }
}
