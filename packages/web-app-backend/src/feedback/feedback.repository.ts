import mongoose from 'mongoose';
import { IFeedback, feedbackModel } from './feedback.schema.js';
import { CountDocumentDTO, CreateFeedbackDTO } from './feedback.dto.js';

export class FeedbackRepository {
  feedbackModel: mongoose.Model<IFeedback>;

  constructor() {
    this.createOne=this.createOne.bind(this);
    this.countDocuments=this.countDocuments.bind(this);
    this.feedbackModel = feedbackModel;
  }

  async countDocuments(countDocumentsDto: CountDocumentDTO) {
    return await this.feedbackModel.countDocuments({ email: countDocumentsDto.email });
  }

  async createOne(createFeedbackDto: CreateFeedbackDTO) {
    const created_at = new Date().toISOString();
    const feedback = new this.feedbackModel({
      email: createFeedbackDto.email,
      message: createFeedbackDto.message,
      created_at,
    });
    await feedback.save();
    return ({
      email: createFeedbackDto.email,
      message: createFeedbackDto.message,
      created_at,
    });
  }

}
