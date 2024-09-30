import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from '../modules/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../common/config/ormConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PostModule,
    TypeOrmModule.forRoot(ormConfig()),
  ],
})
export class AppModule {}
