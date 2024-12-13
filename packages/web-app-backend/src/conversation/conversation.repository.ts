import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { conversationModel, IConversation } from './conversation.schema.js';
import { CreateOneDTO, DeleteOneByIdDTO, FindOneDTO, UpdateOneByIdDTO } from './conversation.dto.js';

export class ConversationRepository {
  model: mongoose.Model<IConversation>;

  constructor() {
    this.findOne=this.findOne.bind(this);
    this.createOne=this.createOne.bind(this);
    this.deleteOneById=this.deleteOneById.bind(this);
    this.updateOneById=this.updateOneById.bind(this);
    this.model = conversationModel;
  }

  async findOne(findOneDto: Readonly<FindOneDTO>) {
    return await this.model.findOne(findOneDto);
  }

  async createOne(createOneDto: Readonly<CreateOneDTO>) {
    const id = uuid();
    const conversation = new this.model({
      id,
      user_email: createOneDto.userEmail,
      website_url: createOneDto.websiteUrl,
      conversation: createOneDto.initialConversation ?? [],
    });
    await conversation.save();
    return ({
      id,
      user_email: createOneDto.userEmail,
      website_url: createOneDto.websiteUrl,
      conversation: createOneDto.initialConversation ?? [],
    } satisfies IConversation)
  }

  async deleteOneById(deleteOneByIdDto: Readonly<DeleteOneByIdDTO>) {
    await this.model.deleteOne({ id: deleteOneByIdDto.id });
    return null;
  }

  async updateOneById(updateOneByIdDto: Readonly<UpdateOneByIdDTO>) {
    return await this.model.updateOne({ id: updateOneByIdDto.id }, updateOneByIdDto.updates);
  }

}
