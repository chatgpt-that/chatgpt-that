import mongoose from 'mongoose';
import { userModel, IUser } from './user.schema.js';
import { CreateUserDTO, FindUserDTO } from './user.dto.js';


export class UserRepository {
  userModel: mongoose.Model<IUser>
  initialCredits: number;

  constructor() {
    this.findOne=this.findOne.bind(this);
    this.createOne=this.createOne.bind(this);
    this.userModel = userModel;
    this.initialCredits = 2;
  }

  async findOne(findUserDto: FindUserDTO) {
    return await this.userModel.findOne({ email: findUserDto.email });
  }

  async createOne(createUserDto: CreateUserDTO) {
    const created_at = new Date().toISOString();
    const user = new this.userModel({
      email: createUserDto.email,
      credits: this.initialCredits,
      created_at
    });
    await user.save();
    const constructedUser: IUser = {
      email: createUserDto.email,
      credits: this.initialCredits,
      created_at
    };
    return constructedUser;
  }

}
