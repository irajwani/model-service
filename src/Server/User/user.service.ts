import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../Schemas/user.schema';
import { CreateUserDto } from '../Auth/Validation';
import { IUser } from './Types/user';
import {
  InternalServerException,
  MongooseErrorCodes,
  UserDoesNotExistException,
  UserExistsException,
} from '../../Common/Errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
  ) {}

  public async create(user: CreateUserDto): Promise<IUser> {
    try {
      return await this.userRepository.create(user);
    } catch (e) {
      if (e.code === MongooseErrorCodes.UniquePropViolation) {
        throw new UserExistsException();
      }
      throw new InternalServerException();
    }
  }

  public async getUserByUsername(username: string): Promise<IUser> {
    const user: IUser = await this.userRepository.findOne({
      username,
    });
    if (!user) throw new UserDoesNotExistException();
    return user;
  }

  public async getUser(_id: string): Promise<IUser> {
    const user: IUser = await this.userRepository.findById({ _id }).lean();
    if (!user) throw new UserDoesNotExistException();
    return user;
  }
}
