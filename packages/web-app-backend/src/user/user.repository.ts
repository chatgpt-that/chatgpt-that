import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { userModel, IUser } from './user.schema.js';
import { CreateUserDTO, FindUserDTO } from './user.dto.js';


export class UserRepository {
  userModel: mongoose.Model<IUser>
  initialCredits: number;

  constructor() {
    this.findOne=this.findOne.bind(this);
    this.createOne=this.createOne.bind(this);
    this.userModel = userModel;
    this.initialCredits = 100;
  }

  async findOne(findUserDto: FindUserDTO) {
    return await this.userModel.findOne({ email: findUserDto.email });
  }

  async createOne(createUserDto: CreateUserDTO) {
    const created_at = new Date().toISOString();
    const id = uuid();
    const user = new this.userModel({
      id,
      email: createUserDto.email,
      credits: this.initialCredits,
      created_at
    });
    await user.save();
    const constructedUser: IUser = {
      id,
      email: createUserDto.email,
      credits: this.initialCredits,
      created_at
    };
    return constructedUser;
  }

}
