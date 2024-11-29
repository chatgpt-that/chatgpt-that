import { FeatureVoteRepository } from './feature-vote.repository.js';
export class FeatureVoteService {
    featureVoteRepository;
    constructor() {
        this.getFeatureVote = this.getFeatureVote.bind(this);
        this.createFeatureVote = this.createFeatureVote.bind(this);
        this.featureVoteRepository = new FeatureVoteRepository();
    }
    async getFeatureVote(getFeatureVoteDto) {
        const featureVote = await this.featureVoteRepository.findOneByEmail({ email: getFeatureVoteDto.email });
        return featureVote?.vote ?? -1;
    }
    async createFeatureVote(createFeatureVoteDto) {
        const existingFeatureVote = await this.featureVoteRepository.findOneByEmail({ email: createFeatureVoteDto.email });
        if (!existingFeatureVote)
            return await this.featureVoteRepository.createOne(createFeatureVoteDto);
        return await this.featureVoteRepository.updateOneByEmail({
            email: createFeatureVoteDto.email,
            updates: { vote: createFeatureVoteDto.vote }
        });
    }
}
