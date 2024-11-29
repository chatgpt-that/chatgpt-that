"use strict";
const styleContainerElement = document.createElement('div');
styleContainerElement.innerHTML = `
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .hover-cursor-pointer {
      cursor: pointer;
    }
    
    .active-scale {
      scale: 1;
    }
    .active-scale:active {
      scale: 0.5;
    }

    @keyframes infinite-scale {
      0% {
        transform: scale(0.9);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.9);
      }
    }

    .animate-infinite-scale {
      animation: infinite-scale 850ms ease-in-out infinite;
    }
  </style>
`;
document.body.appendChild(styleContainerElement);
