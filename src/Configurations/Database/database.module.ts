import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';
import DatabaseConfig from './config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseConfig],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').uri,
        autoIndex: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export default class DatabaseModule {}
