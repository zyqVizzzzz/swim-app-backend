import { Document, ObjectId } from 'mongoose';

export interface Comment extends Document {
  content: string;
  commenter: ObjectId;
  post: ObjectId;
  parentComment?: ObjectId;
  createdAt: Date;
}
