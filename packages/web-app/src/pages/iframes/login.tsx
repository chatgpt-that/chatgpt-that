import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function LoginIFrame() {
  const { loginWithPopup, getIdTokenClaims } = useAuth0();

  const loginAndSendIdToken = async () => {
    try {
      await loginWithPopup();
      const id_token = (await getIdTokenClaims())?.__raw;
      window.parent.postMessage(
        JSON.stringify({
            intendedForChatGPTThat: true,
            id_token,
        }),
        '*'
      );
    } catch (err) {
      console.error(`[Client]: Error logging in - ${err}`);
      window.parent.postMessage(
        JSON.stringify({
          intendedForChatGPTThat: true,
          error: err,
        }),
        '*'
      );
    }
  }

  useEffect(() => {
    loginAndSendIdToken();
  }, []);

  return (
    <div className='hidden'></div>
  );
}
