import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocationService {
  private readonly locationsData: any;

  constructor() {
    const filePath = path.join(__dirname, '../data/province.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    this.locationsData = JSON.parse(jsonData);
  }

  getProvinces() {
    return this.locationsData.provinces;
  }

  // 其他方法，比如获取特定省份的城市，获取特定城市的区域等
}
