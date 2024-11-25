
interface IUser {
  email: string;
  credits: number;
  created_at: string;
}

const getUser = (id_token: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_HOST}/api/user`,
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
      if (data.error) return reject(data.error);
      resolve(data);
    })
    .catch(() => reject('Error fetching user'));
  });
};
