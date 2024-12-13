
const styleContainerElement = document.createElement('div');

styleContainerElement.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

    * {
      margin: 0;
      padding: 0;
      font-family: Lato, sans-serif !important;
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
        transform: scale(0.95);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.95);
      }
    }

    .animate-infinite-scale {
      animation: infinite-scale 850ms ease-in-out infinite;
    }
  </style>
`;

document.body.appendChild(styleContainerElement);
