
export interface CreateFeatureVoteDTO {
  email: string;
  vote: 1 | 2 | 3;
}

export interface FindOneByEmailDTO {
  email: string;
}

export interface UpdateOneByEmailDTO {
  email: string;
  updates: {[key: string]: unknown}
}
