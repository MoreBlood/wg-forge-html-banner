import shapes from './shapes';

export const random = (min, max) => (Math.random() * (max - min)) + min;

export const calculateDistance = (p1x, p1y, p2x, p2y) => {
  const xDistance = p1x - p2x;
  const yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

/* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

const callGetAllValues = (object1) => {
  const result = [];
  const getAllValues = (object) => {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (typeof object[key] === 'string') {
          result.push(object[key]);
        } else if (typeof object[key] === 'object') {
          getAllValues(object[key]);
        }
      }
    }
  };
  getAllValues(object1);
  return result;
};

const preloadImage = url => new Promise((resolve, reject) => {
  const image = new Image();
  image.src = url;
  image.onload = () => resolve({ image, url });
  image.onerror = () => reject();
});

const loadImages = images => Promise.all(images.map(image => preloadImage(image)));

export const preload = () => {
  const allShapes = callGetAllValues(shapes);
  return loadImages(allShapes);
};
