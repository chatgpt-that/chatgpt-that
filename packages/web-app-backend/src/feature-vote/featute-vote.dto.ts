
export interface CreateFeatureVoteDTO {
  email: string;
  vote: 0 | 1 | 2;
}

export interface FindOneByEmailDTO {
  email: string;
}

export interface UpdateOneByEmailDTO {
  email: string;
  updates: {[key: string]: unknown}
}

export interface GetFeatureVoteDTO {
  email: string;
}
