
const createStripeCheckoutUrl = (id_token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_HOST}/api/payment/checkout`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${id_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redirectUrl: window.location.origin
        })
      }
    )
    .then(async (response) => {
      const checkoutUrl = await response.text();
      resolve(checkoutUrl);
    })
    .catch(() => reject('Error completing payment'))
  });
};
