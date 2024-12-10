
const selectorTooltipElement = createElement(
  'div',
  {
    "position": "absolute",
    "top": "1px",
    "left": "50px",
    "border-radius": "8px",
    "height": "40px",
    "background": "transparent",
    "color": "#000000",
    "font-size": "12px",
    "font": "Gilroy",
    "display": "flex",
    "overflow": "hidden",
    "white-space": "nowrap",
    "width": "0",
    "transition": "all 250ms",
    "align-items": "center",
    "border": "2px solid transparent"
  },
  'chatgpt-that-selector-tooltip-element',
  [],
  '',
  false
);

const selectorElement = createElement(
  'div',
  {
    "position": "fixed",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "top": `${INITIAL_SELECTOR_X - 21}px`,
    "left": `${INITIAL_SELECTOR_Y - 21}px`,
    "width": "42px",
    "height": "42px",
    "border-radius": "42px",
    "border": "2px solid #407BFF",
    "background-color": "white",
    "z-index": "999999999999999999999",
    "cursor": "wait",
  },
  'chatgpt-that-selector-element',
  [],
  `
    <svg width="40px" height="40px" viewBox="-32 -32 464.00 464.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke="#ffffff">
      <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)">
        <path transform="translate(-32, -32), scale(14.499999999999998)" d="M16,29.46173682808876C20.01355743769833,29.934409010192052,23.61876727623926,27.24250546380761,26.230966328512512,24.15892338954064C28.959592110974725,20.937904860014346,31.19573711240571,16.85982685795007,30.1373463936418,12.77324294045814C29.103310427520796,8.780695883551335,24.94409889299378,6.929279594839983,21.27888291537105,5.038286676231868C17.41486843162729,3.0447277507090456,13.169253740043978,0.10089791738555087,9.258564004450376,2.0012639116182704C5.354513215618502,3.8984037668533924,4.428459420691258,8.97996004516839,4.2432601249001145,13.316600843405983C4.098396472364859,16.70873915085706,6.403348714625599,19.314576930003447,8.401974754823215,22.05922294108519C10.591877431206084,25.066542732033767,12.305365678856074,29.02662386564657,16,29.46173682808876" fill="#f8dd7c" strokewidth="0"/>
      </g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.8"/>
      <g id="SVGRepo_iconCarrier"> <path d="M97.8357 54.6682C177.199 59.5311 213.038 52.9891 238.043 52.9891C261.298 52.9891 272.24 129.465 262.683 152.048C253.672 173.341 100.331 174.196 93.1919 165.763C84.9363 156.008 89.7095 115.275 89.7095 101.301" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M98.3318 190.694C-10.6597 291.485 121.25 273.498 148.233 295.083" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M98.3301 190.694C99.7917 213.702 101.164 265.697 100.263 272.898" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M208.308 136.239C208.308 131.959 208.308 127.678 208.308 123.396" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M177.299 137.271C177.035 133.883 177.3 126.121 177.3 123.396" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M203.398 241.72C352.097 239.921 374.881 226.73 312.524 341.851" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M285.55 345.448C196.81 341.85 136.851 374.229 178.223 264.504" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M180.018 345.448C160.77 331.385 139.302 320.213 120.658 304.675" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M218.395 190.156C219.024 205.562 219.594 220.898 219.594 236.324" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M218.395 190.156C225.896 202.037 232.97 209.77 241.777 230.327" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M80.1174 119.041C75.5996 120.222 71.0489 119.99 66.4414 120.41" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M59.5935 109.469C59.6539 117.756 59.5918 125.915 58.9102 134.086" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M277.741 115.622C281.155 115.268 284.589 114.823 287.997 114.255" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M291.412 104.682C292.382 110.109 292.095 115.612 292.095 121.093" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> <path d="M225.768 116.466C203.362 113.993 181.657 115.175 160.124 118.568" stroke="#424242" stroke-opacity="0.9" stroke-width="17.6" stroke-linecap="round" stroke-linejoin="round"/> </g>
    </svg>
  `,
  true
);

selectorElement.appendChild(selectorTooltipElement);

const updateSelectorElementPosition = (x: number, y: number) => {
  selectorElement.style.left = `${x}px`;
  selectorElement.style.top = `${y}px`;
};

const hideSelectorTooltip = () => {
  selectorTooltipElement.style.width = '0';
  selectorTooltipElement.style.padding = '0';
  selectorTooltipElement.style.background = "transparent";
  selectorTooltipElement.innerHTML = '';
  selectorTooltipElement.style.borderColor = "transparent";
};

const showSelectorTooltip = (isOpen: boolean) => {
  selectorTooltipElement.style.width = '124px';
  selectorTooltipElement.style.padding = '0 8px';
  selectorTooltipElement.style.border = '2px solid #407BFF';
  selectorTooltipElement.style.background = "white";
  selectorTooltipElement.innerHTML = `Double Click To ${isOpen ? 'Close' : 'Open'}`;
};
