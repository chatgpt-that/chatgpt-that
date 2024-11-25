import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function GetIdTokenIFrame() {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const sendIdToken = async () => {
    let successfullyFetchedRefreshToken = false;
    try {
      await getAccessTokenSilently();
      successfullyFetchedRefreshToken = true;
    } catch {}

    try {
      window.parent.postMessage(
        JSON.stringify({
          intendedForChatGPTThat: true,
          id_token: successfullyFetchedRefreshToken ? (await getIdTokenClaims())?.__raw : ''
        }),
        '*'
      );
    } catch (err) {
      console.error(`[Client]: Error sending id_token - ${err}`);
    }
  };

  useEffect(() => {
    sendIdToken();
  }, []);

  return (
    <div className='hidden'></div>
  );
}
