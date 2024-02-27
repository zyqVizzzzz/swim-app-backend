import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdCounter } from './idCounter.schema'; // 确保已经导入了IdCounter接口

@Injectable()
export class SequenceService {
  constructor(@InjectModel('IdCounter') private idCounterModel: Model<IdCounter>) {}

  async getNextSequenceValue(sequenceName: string): Promise<number> {
    const sequenceDocument = await this.idCounterModel.findOneAndUpdate(
      { counterFor: sequenceName },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true, returnOriginal: false } // 确保新的文档被返回，upsert为true保证如果不存在则创建
    );
    return sequenceDocument.sequenceValue;
  }
}
