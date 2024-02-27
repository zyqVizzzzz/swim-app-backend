export class CreatePostDto {
  readonly author_id: string;
  readonly content: string;
  readonly images: string[];
  readonly sports_data: {
    distance: number;
    duration: number;
    calories: number;
    pace: number;
  };
  readonly likes_count?: number; // 可选字段
  readonly comments?: CommentDto[]; // 可以定义一个CommentDto类
}

class CommentDto {
  readonly author_id: string;
  readonly content: string;
  readonly created_at?: Date; // 可选字段
  readonly replies?: ReplyDto[]; // 可以定义一个ReplyDto类
}

class ReplyDto {
  readonly author_id: string;
  readonly content: string;
  readonly created_at?: Date; // 可选字段
}
