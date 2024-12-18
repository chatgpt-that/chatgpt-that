
const queryInputElement = createElement(
  'input',
  {
    "position": "fixed",
    "bottom": "-72px",
    "left": `${window.innerWidth / 2 - 225}px`,
    "width": "450px",
    "box-sizing": "border-box",
    "height": "48px",
    "border-radius": "8px",
    "border": "none",
    "outline": "none",
    "color": "#FFF",
    "padding": "0 32px 0 32px",
    "background-color": "#424242",
    "transition": "all 250ms",
    "z-index": "999999999999999999"
  },
  'chatgpt-that-query-input-element',
  [],
  '',
  true,
);
queryInputElement.setAttribute('placeholder', 'Type your query and press Enter');

const toggleShowQueryInput = () => {
  const isHidden = queryInputElement.style.bottom === '-72px';
  queryInputElement.style.bottom = isHidden ? '16px' : '-72px';
  isHidden && queryInputElement.focus();
};

const setQueryInputIsLoading = () => {
  (queryInputElement as HTMLInputElement).value = 'Querying...';
  queryInputElement.classList.add('animate-infinite-scale');
  queryInputElement.style.cursor = 'not-allowed';
  queryInputElement.style.opacity = '0.5';
  queryInputElement.blur();
};

const setQueryInputLoadingCompleted = () => {
  (queryInputElement as HTMLInputElement).value = '';
  queryInputElement.classList.remove('animate-infinite-scale');
  queryInputElement.style.cursor = 'default';
  queryInputElement.style.opacity = '1';
  queryInputElement.focus();
};
