
interface IUser {
  email: string;
  credits: number;
  created_at: string;
}

const getUser = (id_token: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    fetch(
      'http://localhost:3000/api/user',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${id_token}`,
          'Content-Type': 'application/json',
        }
      }
    )
    .then(async (response) => {
      const data = await response.json();
      resolve(data);
    })
    .catch(reject);
  });
};
