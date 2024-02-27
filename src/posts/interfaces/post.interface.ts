import { Document } from 'mongoose';

export interface Post extends Document {
  author_id: string;
  content: string;
  images: string[];
  sports_data: {
    distance: number;
    duration: number;
    calories: number;
    pace: number;
  };
  likes_count: number;
  comments: Comment[];
  created_at: Date;
  updated_at: Date;
}

interface Comment {
  author_id: string;
  content: string;
  created_at: Date;
  replies: Reply[];
}

interface Reply {
  author_id: string;
  content: string;
  created_at: Date;
}
