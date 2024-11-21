import mongoose from 'mongoose';
import { IFeatureVote, featureVoteModel } from './feature-vote.schema.js';
import { CreateFeatureVoteDTO, FindOneByEmailDTO, UpdateOneByEmailDTO } from './featute-vote.dto.js';

export class FeatureVoteRepository {
  featureVoteModel: mongoose.Model<IFeatureVote>;

  constructor() {
    this.findOneByEmail=this.findOneByEmail.bind(this);
    this.updateOneByEmail=this.updateOneByEmail.bind(this);
    this.createOne=this.createOne.bind(this);
    this.featureVoteModel = featureVoteModel;
  }

  async findOneByEmail(findOneByEmailDto: FindOneByEmailDTO) {
    return await this.featureVoteModel.findOne({ email: findOneByEmailDto.email });
  }

  async updateOneByEmail(updateOneByEmailDto: UpdateOneByEmailDTO) {
    return await this.featureVoteModel.updateOne(
      { email: updateOneByEmailDto.email },
      updateOneByEmailDto.updates,
    );
  }

  async createOne(createFeatureVoteDto: CreateFeatureVoteDTO) {
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
