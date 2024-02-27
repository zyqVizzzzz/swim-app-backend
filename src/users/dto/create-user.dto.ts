export class CreateUserDto {
  readonly user_id: number;
  readonly email: string;
  readonly password: string;
  readonly nickname: string;
  readonly avatar_url?: string;
  readonly signature?: string;
}
