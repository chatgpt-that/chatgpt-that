import { FeedbackRepository } from './feedback.repository.js';
export class FeedbackService {
    feedbackRepository;
    constructor() {
        this.createFeedback = this.createFeedback.bind(this);
        this.feedbackRepository = new FeedbackRepository();
    }
    async createFeedback(createFeedbackDto) {
        const feedbackCountFromUser = await this.feedbackRepository.countDocuments({ email: createFeedbackDto.email });
        if (feedbackCountFromUser > 9)
            throw 'Too many unread feedback requests';
        return await this.feedbackRepository.createOne(createFeedbackDto);
    }
}
