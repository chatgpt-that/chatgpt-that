
const createElement = (
  type: string,
  styles: {[key: string]: unknown},
  id?: string,
  classes?: string[],
  innerHTML?: string,
  appendToBody?: boolean,
) => {
  const node = document.createElement(type);
  if (id) node.id = id;
  (classes??[]).forEach((classString) => node.classList.add(classString));
  for (const property in styles) (node.style as any)[property] = styles[property];
  node.innerHTML = innerHTML ?? '';
  if (appendToBody) document.body.appendChild(node);
  return node;
};


// /**
//  * @param {number} x1
//  * @param {number} x2 
//  * @param {number} y1 
//  * @param {number} y2 
//  * @returns { x: number; y: number; width: number; height: number }
//  */
// const calculateRectangle = (x1, x2, y1, y2) => {
//   const x = x1 < x2 ? x1 : x2;
//   const y = y1 < y2 ? y1 : y2;
//   const endX = x1 > x2 ? x1 : x2;
//   const endY = y1 > y2 ? y1 : y2;
//   const width = endX - x;
//   const height = endY - y;
//   return { x, y, width, height };
// };


// /**
//  * @param {{ x: number; y: number; width: number; height: number }} rectange
//  * @param {(imageDataUrl: string) => void} callback
//  * @returns {void}
//  */
// const getSelectorDataUrl = (rectange, callback) => {
//   html2canvas(
//     document.body,
//     { 
//       x: rectange.x,
//       y: rectange.y,
//       width: rectange.width,
//       height: rectange.height,
//       scrollX: 0,
//       scrollY: 0,
//     }
//   )
//   .then((canvas) => {
//     const imageDataUrl = canvas.toDataURL('image/png');
//     if (callback) callback(imageDataUrl);
//   })
//   .catch(error => console.error(`Error loading page into image - ${error}`));
// };
