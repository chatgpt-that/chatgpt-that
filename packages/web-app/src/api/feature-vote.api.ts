import axios from 'axios';

export interface GetFeatureVoteDTO {
  id_token: string;
}

export interface UpsertFeatureVoteDTO {
  id_token: string;
  vote: 0 | 1 | 2; 
}

export const getFeatureVote = (getFeatureVoteDto: GetFeatureVoteDTO): Promise<0|1|2|-1> => {
  return new Promise((resolve, reject) => {
    axios.get(
      '/api/feature-vote',
      { 
        headers: {
          "Authorization": `Bearer ${getFeatureVoteDto.id_token}`,
          "Content-Type": 'application/json',
        }
      }
    )
    .then((response) => resolve(response.data))
    .catch(reject);
  });
};

export const upsertFeatureVote = (upsertFeatureVoteDto: UpsertFeatureVoteDTO): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(
      '/api/feature-vote',
      { 
        vote: upsertFeatureVoteDto.vote 
      },
      { 
        headers: {
          "Authorization": `Bearer ${upsertFeatureVoteDto.id_token}`,
          "Content-Type": 'application/json',
        }
      }
    )
    .then(() => resolve())
    .catch(reject);
  });
};
