
const selectionBoxElement = createElement(
  'div',
  {
    "visibility": "hidden",
    "position": "fixed",
    "top": `${INITIAL_SELECTOR_Y}px`,
    "left": `${INITIAL_SELECTOR_X}px`,
    "width": `${INITIAL_SELECTOR_RESIZER_X - INITIAL_SELECTOR_X}px`,
    "height": `${INITIAL_SELECTOR_RESIZER_Y - INITIAL_SELECTOR_Y}px`,
    "border-radius": "8px",
    "border": "2px solid #407BFF",
    "background-color": "rgba(64,123,255,0.1)",
    "z-index": "9999999999999999",
  },
  'chatgpt-that-selection-box-element',
  [],
  '',
  true
);

const toggleSelectionBoxElement = () => {
    selectionBoxElement.style.visibility
    = selectionBoxElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
};

const updateSelectionBoxElementPosition = (x: number, y: number) => {
  selectionBoxElement.style.left = `${x}px`;
  selectionBoxElement.style.top = `${y}px`;
};

const updateSelectionBoxElementSize = (width: number, height: number) => {
  selectionBoxElement.style.width = `${width}px`;
  selectionBoxElement.style.height = `${height}px`;
};
