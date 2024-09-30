import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from '../modules/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PostModule,
  ],
})
export class AppModule {}
