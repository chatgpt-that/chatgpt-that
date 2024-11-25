//////////////////////////////////////////////////
// STATE MANAGER
//////////////////////////////////////////////////

const STATE_MANAGER = {
  selectorPositionX: INITIAL_SELECTOR_X,
  selectorPositionY: INITIAL_SELECTOR_Y,
  selectorMouseDown: false,
  selectorResizerPositionX: INITIAL_SELECTOR_RESIZER_X,
  selectorResizerPositionY: INITIAL_SELECTOR_RESIZER_Y,
  selectorResizerMouseDown: false,

  // Authentication
  initialLoginAttemptCompleted: false,
  id_token: '',

};

// Initial login attempt 
getIdToken() 
.then((id_token) => STATE_MANAGER.id_token = id_token) 
.catch((err) => console.error(`[Client]: Error fetching initial id_token - ${err}`)) 
.finally(() => {
  STATE_MANAGER.initialLoginAttemptCompleted = true; 
  selectorElement.style.cursor = 'pointer';
});

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
    .then((id_token) => STATE_MANAGER.id_token = id_token)
    .catch((err) => {
      console.error(`[Client]: Error logging in - ${err}`);
      showQueryResponseWithMessage('Unable to log in at this time, please refresh and try again', true);
    });
  }

  toggleSelectorResizerElement();
  toggleSelectionBoxElement();
  toggleShowQueryInput();
  toggleShowLogoutButton();
  hideQueryResponse();
});

// QUERY INPUT
queryInputElement.addEventListener('keyup', (event) => {
  if (event.key !== 'Enter') return;
  showQueryResponseWithMessage((event.target as any).value);
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
  })
  .catch((err) => {
    console.error(`[Client]: Failed to logout - ${err}`);
    showQueryResponseWithMessage('Unable to log out at this time, please refresh and try again', true);
  });
});
