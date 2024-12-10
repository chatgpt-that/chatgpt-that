import { featureVoteModel } from './feature-vote.schema.js';
export class FeatureVoteRepository {
    featureVoteModel;
    constructor() {
        this.findOneByEmail = this.findOneByEmail.bind(this);
        this.updateOneByEmail = this.updateOneByEmail.bind(this);
        this.createOne = this.createOne.bind(this);
        this.featureVoteModel = featureVoteModel;
    }
    async findOneByEmail(findOneByEmailDto) {
        return await this.featureVoteModel.findOne({ email: findOneByEmailDto.email });
    }
    async updateOneByEmail(updateOneByEmailDto) {
        return await this.featureVoteModel.updateOne({ email: updateOneByEmailDto.email }, updateOneByEmailDto.updates);
    }
    async createOne(createFeatureVoteDto) {
        const created_at = new Date().toISOString();
        const featureVote = new this.featureVoteModel({
            email: createFeatureVoteDto.email,
            vote: createFeatureVoteDto.vote,
            created_at,
        });
        await featureVote.save();
        return ({
            email: createFeatureVoteDto.email,
            vote: createFeatureVoteDto.vote,
            created_at
        });
    }
}
