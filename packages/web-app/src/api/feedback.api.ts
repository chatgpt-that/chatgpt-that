import axios from 'axios';

export interface SendFeedbackDTO {
  id_token: string;
  feedbackMessage: string;
}

export const sendFeedback = (sendFeedbackDto: SendFeedbackDTO) => {
  return new Promise((resolve, reject) => {
    axios.post(
      '/api/feedback',
      {
        message: sendFeedbackDto.feedbackMessage,
      },
      { 
        headers: {
          "Authorization": `Bearer ${sendFeedbackDto.id_token}`,
          "Content-Type": 'application/json',
        }
      }
    )
    .then((response) => resolve(response.data))
    .catch(reject)
  });
};
