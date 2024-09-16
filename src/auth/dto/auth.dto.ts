export class WeChatLoginDto {
  readonly code: string;
  readonly userInfo: any; // 根据需要定义类型
}

export class WeChatPhoneDto {
  readonly code: string;
  readonly encryptedData: string;
  readonly iv: string;
}
