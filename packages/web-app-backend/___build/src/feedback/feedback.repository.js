import { feedbackModel } from './feedback.schema.js';
export class FeedbackRepository {
    feedbackModel;
    constructor() {
        this.createOne = this.createOne.bind(this);
        this.countDocuments = this.countDocuments.bind(this);
        this.feedbackModel = feedbackModel;
    }
    async countDocuments(countDocumentsDto) {
        return await this.feedbackModel.countDocuments({ email: countDocumentsDto.email });
    }
    async createOne(createFeedbackDto) {
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
