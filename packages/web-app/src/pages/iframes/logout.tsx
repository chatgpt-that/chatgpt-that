import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function LogoutIFrame() {
  const { logout } = useAuth0();

  const sendLogout = async () => {
    try {
      await logout();
      window.parent.postMessage(
        JSON.stringify({
            intendedForChatGPTThat: true,
            status: 'completed'
        }),
        '*'
      );
    } catch (err) {
      console.error(`[Client]: Error logging out - ${err}`);
      window.parent.postMessage(
        JSON.stringify({
          intendedForChatGPTThat: true,
          status: 'failed'
        }),
        '*'
      );
    }
  }

  useEffect(() => {
    sendLogout();
  }, []);

  return (
    <div className='hidden'></div>
  );
}
