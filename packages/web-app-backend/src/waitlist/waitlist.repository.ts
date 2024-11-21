import mongoose from 'mongoose';
import { IWaitList, waitListModel } from './waitlist.schema.js';
import { CreateWaitListDTO, FindOneByEmailDTO } from './waitlist.dto.js';

export class WaitListRepository {
  waitListModel: mongoose.Model<IWaitList>

  constructor() {
    this.findOneByEmail=this.findOneByEmail.bind(this);
    this.createOne=this.createOne.bind(this);
    this.waitListModel = waitListModel;
  }

  async findOneByEmail(findOneByEmailDTO: FindOneByEmailDTO) {
    const waitList = await this.waitListModel.findOne({ email: findOneByEmailDTO.email });
    return waitList;
  }

  async createOne(createWaitListDto: CreateWaitListDTO) {
    const created_at = new Date().toISOString();
    const waitList = new this.waitListModel({
      email: createWaitListDto.email,
      created_at,
    });
    await waitList.save();
    return ({
      email: createWaitListDto.email,
      created_at
    });
  }
}
