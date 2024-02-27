import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response.interceptor'; // 引入拦截器
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'; // 根据实际路径导入

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ResponseInterceptor()); // 注册为全局拦截器
  app.useGlobalFilters(new GlobalExceptionFilter()); // 注册为全局过滤器
  await app.listen(3000);
}
bootstrap();
