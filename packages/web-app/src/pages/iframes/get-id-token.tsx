import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function GetIdTokenIFrame() {
  const { getIdTokenClaims } = useAuth0();

  const sendIdToken = async () => {
    try {
      window.parent.postMessage(
        JSON.stringify({
          intendedForChatGPTThat: true,
          id_token: (await getIdTokenClaims())?.__raw
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
