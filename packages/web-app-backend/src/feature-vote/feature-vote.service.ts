import { FeatureVoteRepository } from './feature-vote.repository.js';
import { CreateFeatureVoteDTO } from './featute-vote.dto.js';

export class FeatureVoteService {
  featureVoteRepository: FeatureVoteRepository;

  constructor() {
    this.createFeatureVote=this.createFeatureVote.bind(this);
    this.featureVoteRepository = new FeatureVoteRepository();
  }

  async createFeatureVote(createFeatureVoteDto: CreateFeatureVoteDTO) {
    const existingFeatureVote = await this.featureVoteRepository.findOneByEmail({ email: createFeatureVoteDto.email });
    if (!existingFeatureVote) return await this.featureVoteRepository.createOne(createFeatureVoteDto);
    return await this.featureVoteRepository.updateOneByEmail({
      email: createFeatureVoteDto.email,
      updates: { vote: createFeatureVoteDto.vote }
    });
  }

}
