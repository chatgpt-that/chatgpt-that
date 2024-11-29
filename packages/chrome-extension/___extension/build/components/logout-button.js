"use strict";
const logoutButtonElement = createElement('div', {
    "position": "fixed",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "bottom": "-72px",
    "transition": "all 250ms",
    "left": `${window.innerWidth / 2 + 225 + 8}px`,
    "width": "48px",
    "height": "48px",
    "border-radius": "8px",
    "border": "none",
    "background-color": "#424242",
    "cursor": "pointer",
    "z-index": "999999999999999999"
}, 'chatgpt-that-logout-button-element', ['active-scale'], `
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier"> <path d="M21 12L13 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
    </svg>`, true);
const toggleShowLogoutButton = () => {
    const isHidden = logoutButtonElement.style.bottom === '-72px';
    logoutButtonElement.style.bottom = isHidden ? '16px' : '-72px';
};
