export class CreateCommentDto {
  readonly content: string;
  readonly commenter: string; // 用户ID
  readonly post: string; // 帖子ID
  readonly parentComment?: string; // 父评论ID，用于嵌套评论
}