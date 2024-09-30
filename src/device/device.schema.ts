import * as mongoose from 'mongoose';

// Device interface to enforce type checking
export interface Device extends mongoose.Document {
  device_id: string;
  open_id: string; // user's openId
  device_name: string;
  device_model: string;
  device_status: string; // e.g., 'bound', 'unbound', 'online', 'offline'
  last_sync: Date;
  created_at: Date;
  updated_at: Date;
}

// Device Schema definition
export const DeviceSchema = new mongoose.Schema<Device>({
  device_id: { type: String, required: true, unique: true },
  open_id: { type: String, required: true }, // Reference to the user's openId
  device_name: { type: String, required: true },
  device_model: { type: String, required: true },
  device_status: {
    type: String,
    required: true,
    enum: ['bound', 'unbound', 'online', 'offline'],
  },
  last_sync: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
