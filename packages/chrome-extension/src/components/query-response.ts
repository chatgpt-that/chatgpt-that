
const queryResponseElement = createElement(
  'div',
  {
    "position": "fixed",
    "bottom": "72px",
    "left": `${window.innerWidth / 2 + 225}px`,
    "width": "450px",
    "border-radius": "8px",
    "padding": "16px 48px 16px 32px",
    "border": "none",
    "color": "#FFF",
    "opacity": "0",
    "background-color": "#2F2F2F",
    "z-index": "999999999999999999",
    "box-sizing": "border-box",
    "transition": "all 250ms",
  },
  'chatgpt-that-query-response-element',
  [],
  '',
  true
);

const queryResponseCopyIconElement = createElement(
  'div',
  {
    "position": "absolute",
    "bottom": "14px",
    "right": "16px",
    "display": "flex",
    "box-sizing": "border-box",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer",
    "transition": "all 250ms"
  },
  undefined,
  ['active-scale'],
  `
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#f5f5f5"/> </g>
    </svg>
  `,
  false
);

const hideQueryResponse = () => {
  queryResponseElement.style.opacity = '0';
  queryResponseElement.style.bottom = '250px';
  setTimeout(() => {
    queryResponseElement.innerText = '';
    queryResponseElement.appendChild(queryResponseCopyIconElement);
    queryResponseElement.style.bottom = '72px';
    queryResponseElement.style.left = `${window.innerWidth / 2 + 225}px`;
  }, 250);
};

const showQueryResponseWithMessage = (message: string, isErrorMessage?: boolean) => {
  queryResponseElement.innerText = message;
  queryResponseElement.style.opacity = '1';
  if (!isErrorMessage) queryResponseElement.appendChild(queryResponseCopyIconElement);
  queryResponseElement.style.left = `${window.innerWidth / 2 - 225}px`;
  queryResponseElement.style.background = isErrorMessage ? '#FF2424' : '#2F2F2F';
};
