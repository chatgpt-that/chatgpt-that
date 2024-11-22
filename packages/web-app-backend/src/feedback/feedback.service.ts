import { CreateFeedbackDTO } from './feedback.dto.js';
import { FeedbackRepository } from './feedback.repository.js';

export class FeedbackService {
  feedbackRepository: FeedbackRepository;
  
  constructor() {
    this.createFeedback=this.createFeedback.bind(this);
    this.feedbackRepository = new FeedbackRepository();
  }

  async createFeedback(createFeedbackDto: CreateFeedbackDTO) {
    const feedbackCountFromUser = await this.feedbackRepository.countDocuments({ email: createFeedbackDto.email });
    if (feedbackCountFromUser > 9) throw Error('Too many unread feedback requests');
    return await this.feedbackRepository.createOne(createFeedbackDto);
  }
}
