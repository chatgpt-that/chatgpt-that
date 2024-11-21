import mongoose from 'mongoose';
import { IFeedback, feedbackModel } from './feedback.schema.js';
import { CreateFeedbackDTO } from './feedback.dto.js';

export class FeedbackRepository {
  feedbackModel: mongoose.Model<IFeedback>;

  constructor() {
    this.createOne=this.createOne.bind(this);
    this.feedbackModel = feedbackModel;
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
