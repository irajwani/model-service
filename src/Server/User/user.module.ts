import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Schemas/user.schema';
import { UserController } from './user.controller';
import { LogService } from '../Log/log.service';
import { Log, LogSchema } from '../../Schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Log.name, schema: LogSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, LogService],
  exports: [UserService, LogService],
})
export class UserModule {}
