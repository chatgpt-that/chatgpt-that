import { v4 as uuid } from 'uuid';
import { conversationModel } from './conversation.schema.js';
export class ConversationRepository {
    model;
    constructor() {
        this.findOne = this.findOne.bind(this);
        this.createOne = this.createOne.bind(this);
        this.deleteOneById = this.deleteOneById.bind(this);
        this.updateOneById = this.updateOneById.bind(this);
        this.model = conversationModel;
    }
    async findOne(findOneDto) {
        return await this.model.findOne(findOneDto);
    }
    async createOne(createOneDto) {
        const id = uuid();
        const conversation = new this.model({
            id,
            user_email: createOneDto.userEmail,
            website_url: createOneDto.websiteUrl,
            conversation: createOneDto.initialConversation ?? [],
        });
        await conversation.save();
        return {
            id,
            user_email: createOneDto.userEmail,
            website_url: createOneDto.websiteUrl,
            conversation: createOneDto.initialConversation ?? [],
        };
    }
    async deleteOneById(deleteOneByIdDto) {
        await this.model.deleteOne({ id: deleteOneByIdDto.id });
        return null;
    }
    async updateOneById(updateOneByIdDto) {
        return await this.model.updateOne({ id: updateOneByIdDto.id }, updateOneByIdDto.updates);
    }
}
