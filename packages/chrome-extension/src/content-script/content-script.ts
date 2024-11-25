//////////////////////////////////////////////////
// STATE MANAGER
//////////////////////////////////////////////////

interface IStateManager {
  selectorPositionX: number;
  selectorPositionY: number;
  selectorMouseDown: boolean;
  selectorResizerPositionX: number;
  selectorResizerPositionY: number;
  selectorResizerMouseDown: boolean;
  initialLoginAttemptCompleted: boolean;
  isQuerying: boolean;
  id_token: string;
  user: IUser | null;
}

const STATE_MANAGER: IStateManager = {
  selectorPositionX: INITIAL_SELECTOR_X,
  selectorPositionY: INITIAL_SELECTOR_Y,
  selectorMouseDown: false,
  selectorResizerPositionX: INITIAL_SELECTOR_RESIZER_X,
  selectorResizerPositionY: INITIAL_SELECTOR_RESIZER_Y,
  selectorResizerMouseDown: false,
  isQuerying: false,

  // Authentication
  initialLoginAttemptCompleted: false,
  id_token: '',

  // User
  user: null,

};

const fetchAndSetUser = async () => {
  try {
    const user = await getUser(STATE_MANAGER.id_token);
    STATE_MANAGER.user = user;
  } catch (err) {
    showQueryResponseWithMessage('Error fetching user data, try refreshing', true);
  }
};

const fetchAndSetIdToken = async (setUser?: boolean) => { 
  try { 
    const id_token = await getIdToken();
    STATE_MANAGER.id_token = id_token;
    if (setUser && id_token) await fetchAndSetUser();
  } catch (err) { 
    console.error(`[Client]: Error fetching initial id_token - ${err}`); 
  } finally { 
    if (STATE_MANAGER.initialLoginAttemptCompleted) return; 
    STATE_MANAGER.initialLoginAttemptCompleted = true; 
    selectorElement.style.cursor = 'pointer'; 
  } 
}; 

const redirectToStripeCheckout = () => {
  createStripeCheckoutUrl(STATE_MANAGER.id_token)
  .then((stripeCheckoutUrl) => window.location.href = stripeCheckoutUrl)
  .catch(() => showQueryResponseWithMessage('Error creating stripe payment url', true));
};

// Initial login attempt
fetchAndSetIdToken(true); 

//////////////////////////////////////////////////
// EVENT LISTENERS
//////////////////////////////////////////////////

// WINDOW
window.addEventListener('mouseup', () => {
  STATE_MANAGER.selectorMouseDown = false;
  STATE_MANAGER.selectorResizerMouseDown = false;
});

window.addEventListener('mousemove', (event) => {
  if (!STATE_MANAGER.selectorMouseDown && !STATE_MANAGER.selectorResizerMouseDown) return;
  if (STATE_MANAGER.selectorMouseDown) {
    const selectorDeltaX = STATE_MANAGER.selectorResizerPositionX - STATE_MANAGER.selectorPositionX;
    const selectorDeltaY = STATE_MANAGER.selectorResizerPositionY - STATE_MANAGER.selectorPositionY;
    STATE_MANAGER.selectorPositionX = event.clientX;
    STATE_MANAGER.selectorPositionY = event.clientY;
    STATE_MANAGER.selectorResizerPositionX = event.clientX + selectorDeltaX;
    STATE_MANAGER.selectorResizerPositionY = event.clientY + selectorDeltaY;
    updateSelectorElementPosition(STATE_MANAGER.selectorPositionX - 21, STATE_MANAGER.selectorPositionY - 21);
    updateSelectorResizerElementPosition(STATE_MANAGER.selectorResizerPositionX - 8, STATE_MANAGER.selectorResizerPositionY - 8);
  } else if (STATE_MANAGER.selectorResizerMouseDown) {
    STATE_MANAGER.selectorResizerPositionX = event.clientX;
    STATE_MANAGER.selectorResizerPositionY = event.clientY;
    if (STATE_MANAGER.selectorResizerPositionX < STATE_MANAGER.selectorPositionX) STATE_MANAGER.selectorResizerPositionX = STATE_MANAGER.selectorPositionX;
    if (STATE_MANAGER.selectorResizerPositionY < STATE_MANAGER.selectorPositionY) STATE_MANAGER.selectorResizerPositionY = STATE_MANAGER.selectorPositionY;
    updateSelectorResizerElementPosition(STATE_MANAGER.selectorResizerPositionX - 8, STATE_MANAGER.selectorResizerPositionY - 8);
  }
  const selectionBoxWidth = STATE_MANAGER.selectorResizerPositionX - STATE_MANAGER.selectorPositionX;
  const selectionBoxHeight = STATE_MANAGER.selectorResizerPositionY - STATE_MANAGER.selectorPositionY;
  updateSelectionBoxElementPosition(STATE_MANAGER.selectorPositionX, STATE_MANAGER.selectorPositionY);
  updateSelectionBoxElementSize(selectionBoxWidth, selectionBoxHeight);
});

// SELECTOR & RESIZER ELEMENT
selectorElement.addEventListener('mousedown', (event) => {
  event.stopPropagation();
  event.preventDefault();
  STATE_MANAGER.selectorMouseDown = true;
});

selectorResizerElement.addEventListener('mousedown', (event) => {
  event.stopPropagation();
  event.preventDefault();
  STATE_MANAGER.selectorResizerMouseDown = true;
});

selectorElement.addEventListener('dblclick', async (event) => {
  if (!STATE_MANAGER.initialLoginAttemptCompleted) {
    showQueryResponseWithMessage('Attempting to authenticate, please wait', true);
    return;
  }
 
  if (!STATE_MANAGER.id_token) {
    return login()
    .then((id_token) => {
      STATE_MANAGER.id_token = id_token;
      fetchAndSetUser();
    })
    .catch((err) => {
      console.error(`[Client]: Error logging in - ${err}`);
      showQueryResponseWithMessage('Unable to log in at this time, please refresh and try again', true);
    });
  }

  if (!STATE_MANAGER.user) {
    return showQueryResponseWithMessage('Ran into an issue retrieving user data, please refresh and try again', true);
  }

  if (STATE_MANAGER.user.credits <= 0) {
    return redirectToStripeCheckout();
  }

  toggleSelectorResizerElement();
  toggleSelectionBoxElement();
  toggleShowQueryInput();
  toggleShowLogoutButton();
  hideQueryResponse();
});

// QUERY INPUT
queryInputElement.addEventListener('keydown', (event) => {
  if (!STATE_MANAGER.isQuerying) return;
  event.stopPropagation();
  event.preventDefault();
});

queryInputElement.addEventListener('keyup', async (event) => {
  if (event.key !== 'Enter') return;
  try {

    if (STATE_MANAGER.user && STATE_MANAGER.user.credits <= 0) {
      try { getMoreCreditsElement.removeEventListener('click', redirectToStripeCheckout) } catch{}
      return showQueryResponseWithMessage('Out of credits! ', true, redirectToStripeCheckout);
    }

    const queryText = (event.target as HTMLInputElement).value;
    setQueryInputIsLoading();
    STATE_MANAGER.isQuerying = true;
    await fetchAndSetIdToken();
    const rectangle = calculateRectangle(
      STATE_MANAGER.selectorPositionX, 
      STATE_MANAGER.selectorResizerPositionX ,
      STATE_MANAGER.selectorPositionY, 
      STATE_MANAGER.selectorResizerPositionY, 
    );
    const imageDataUrl = await createImageDataUrlFromSelectedField(rectangle);
    const queryResponse = await queryImage(STATE_MANAGER.id_token, imageDataUrl, queryText);
    showQueryResponseWithMessage(queryResponse);
    if (STATE_MANAGER.user?.credits) STATE_MANAGER.user.credits -= 1;
  } catch (err) {
    showQueryResponseWithMessage(err as string, true);
  } finally {
    setQueryInputLoadingCompleted();
    STATE_MANAGER.isQuerying = false;
  }
});

// QUERY RESPONSE COPY ICON
queryResponseCopyIconElement.addEventListener('click', async () => {
  const clipboardText = queryResponseElement.innerText;
  await window.navigator.clipboard.writeText(clipboardText);
});

// LOGOUT BUTTON
logoutButtonElement.addEventListener('click', () => {
  logout()
  .then(() => {
    toggleSelectorResizerElement();
    toggleSelectionBoxElement();
    toggleShowQueryInput();
    toggleShowLogoutButton();
    hideQueryResponse();
    STATE_MANAGER.id_token = '';
    STATE_MANAGER.user = null;
  })
  .catch((err) => {
    console.error(`[Client]: Failed to logout - ${err}`);
    showQueryResponseWithMessage('Unable to log out at this time, please refresh and try again', true);
  });
});
