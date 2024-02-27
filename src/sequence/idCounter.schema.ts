import * as mongoose from 'mongoose';

export const IdCounterSchema = new mongoose.Schema({
  counterFor: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 }
}, { collection: 'idcounters' })

export interface IdCounter extends mongoose.Document {
  counterFor: string,
  sequenceValue: number
}

// counterFor：指定计数器用于哪个集合，sequenceValue：存储当前的序列值
