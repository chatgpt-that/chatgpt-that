
const selectorResizerElement = createElement(
  'div',
  {
    "visibility": "hidden",
    "position": "fixed",
    "top": `${INITIAL_SELECTOR_RESIZER_Y - 8}px`,
    "left": `${INITIAL_SELECTOR_RESIZER_X - 8}px`,
    "width": "16px",
    "height": "16px",
    "border-radius": "16px",
    "border": "2px solid #407BFF",
    "background-color": "white",
    "z-index": "999999999999999999",
    "cursor": "pointer",
  },
  'chatgpt-that-selector-resizer-element',
  [],
  '',
  true
);

const toggleSelectorResizerElement = () => {
  selectorResizerElement.style.visibility
    = selectorResizerElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
};

const updateSelectorResizerElementPosition = (x: number, y: number) => {
  selectorResizerElement.style.left = `${x}px`;
  selectorResizerElement.style.top = `${y}px`;
};
