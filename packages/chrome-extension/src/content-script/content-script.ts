//////////////////////////////////////////////////
// STATE MANAGER
//////////////////////////////////////////////////

interface IStateManager {
  selectorPositionX: number;
  selectorPositionY: number;
  selectorMouseDown: boolean;
  selectorHovered: boolean;
  selectorOpened: boolean;
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
  selectorHovered: false,
  selectorOpened: false,
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

const checkIdTokenAndRemoveIfExpired = async () => {
  try {
    const idToken = await getIdTokenFromStorage();
    if (!idToken) {
      STATE_MANAGER.user = null;
      return STATE_MANAGER.id_token = '';
    }
    const tokenClaims = decodeJwtPayload(idToken);
    const tokenExpiration = new Date(tokenClaims.exp as number * 1000);
    if (tokenExpiration.getTime() > new Date().getTime()) return;
    await clearIdTokenOnStorage();
    STATE_MANAGER.user = null;
    STATE_MANAGER.id_token = '';
  } catch (err) {
    if (IS_DEV_ENV) console.error(`[Dev]: Failed to check id token - ${err}`);
  }
};

const getIdTokenAndSetUserIfAvailable = async () => {
  try {
    const idToken = await getIdTokenFromStorage();
    if (!idToken) return IS_DEV_ENV ? console.log(`[Dev]: getIdTokenAndSetUserIfAvailable Failed - No IdToken in Chrome Storage`) : null;
    IS_DEV_ENV && console.log(`[Dev]: Retrieved id_token - ${idToken.length}`);
    STATE_MANAGER.id_token = idToken;
    const user = await getUser(STATE_MANAGER.id_token);
    STATE_MANAGER.user = user;
  } catch (err) {
    console.error(`[Client]: Failed to fetch user - ${err}`);
    showQueryResponseWithMessage('Failed to fetch user, please refresh and try again.', true);
  } finally {
    STATE_MANAGER.initialLoginAttemptCompleted = true;
    selectorElement.style.cursor = 'pointer';
  }
};

const loginAndUpdateState = async () => {
  try {
    const idToken = await login();
    await setIdTokenOnStorage(idToken);
    await getIdTokenAndSetUserIfAvailable();
  } catch (err) {
    console.error(`[Client]: Failed to login - ${err}`);
    showQueryResponseWithMessage('Failed to login, please refresh and try again.', true);
  }
};

const logoutAndUpdateState = async () => {
  try {
    await logout();
    STATE_MANAGER.user = null;
    STATE_MANAGER.id_token = '';
    toggleSelectorResizerElement();
    toggleSelectionBoxElement();
    STATE_MANAGER.selectorOpened = !STATE_MANAGER.selectorOpened;
    selectorTooltipElement.innerHTML = `Double Click To ${STATE_MANAGER.selectorOpened ? 'Close' : 'Open'}`;
    toggleShowQueryInput();
    toggleShowLogoutButton();
    hideQueryResponse();
    await clearIdTokenOnStorage();
  } catch (err) {
    console.error(`[Client]: Failed to logout - ${err}`);
    showQueryResponseWithMessage('Failed to logout, please refresh and try again.', true);
  }
};

const redirectToStripeCheckout = () => {
  createStripeCheckoutUrl(STATE_MANAGER.id_token)
  .then((stripeCheckoutUrl) => window.location.href = stripeCheckoutUrl)
  .catch(() => showQueryResponseWithMessage('Error creating stripe payment url', true));
};

// Initial login attempt
checkIdTokenAndRemoveIfExpired();
getIdTokenAndSetUserIfAvailable();

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

selectorElement.addEventListener('mouseenter', () => {
  STATE_MANAGER.selectorHovered = true;
  showSelectorTooltip(STATE_MANAGER.selectorOpened);
});

selectorElement.addEventListener('mouseleave', () => {
  STATE_MANAGER.selectorHovered = false;
  hideSelectorTooltip();
});

selectorElement.addEventListener('dblclick', async (event) => {
  if (!STATE_MANAGER.initialLoginAttemptCompleted) {
    showQueryResponseWithMessage('Attempting to authenticate, please wait', true);
    return;
  }
 
  if (!STATE_MANAGER.id_token) await loginAndUpdateState();

  if (!STATE_MANAGER.user) {
    return showQueryResponseWithMessage('Failed to retrieve user, please refresh and try again', true);
  }

  if (STATE_MANAGER.user.credits <= 0) {
    return redirectToStripeCheckout();
  }

  STATE_MANAGER.selectorOpened = !STATE_MANAGER.selectorOpened;
  selectorTooltipElement.innerHTML = `Double Click To ${STATE_MANAGER.selectorOpened ? 'Close' : 'Open'}`;
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
    const rectangle = calculateRectangle(
      STATE_MANAGER.selectorPositionX, 
      STATE_MANAGER.selectorResizerPositionX ,
      STATE_MANAGER.selectorPositionY, 
      STATE_MANAGER.selectorResizerPositionY, 
    );
    const imageDataUrl = await createImageDataUrlFromViewport(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
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
logoutButtonElement.addEventListener('click', logoutAndUpdateState);
