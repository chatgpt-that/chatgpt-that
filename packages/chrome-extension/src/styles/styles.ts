
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

    @keyframes infiniteScale {
      0% {
        transform: scale(0.5);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.5);
      }
    }

    .animate-infinite-scale {
      animation: infiniteScale 850ms ease-in-out infinite;
    }
  </style>
`;

document.body.appendChild(styleContainerElement);
