import { FeatureVoteRepository } from './feature-vote.repository.js';
import { CreateFeatureVoteDTO, GetFeatureVoteDTO } from './featute-vote.dto.js';

export class FeatureVoteService {
  featureVoteRepository: FeatureVoteRepository;

  constructor() {
    this.getFeatureVote=this.getFeatureVote.bind(this);
    this.createFeatureVote=this.createFeatureVote.bind(this);
    this.featureVoteRepository = new FeatureVoteRepository();
  }

  async getFeatureVote(getFeatureVoteDto: GetFeatureVoteDTO) {
    const featureVote = await this.featureVoteRepository.findOneByEmail({ email: getFeatureVoteDto.email });
    return featureVote?.vote ?? -1;
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
