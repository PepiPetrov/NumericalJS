import NumpyArray from './array/NumpyArray';
// const Numpy = {
//   Array: NumpyArray,
// };

// export default Numpy;

import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
import tail from 'lodash/tail';
import map from 'lodash/map';

export default function createMatrix(shape: number[]): any {
  if (isEmpty(shape)) {
    return null;
  }

  const matrix = times(shape[0], () => createMatrix(tail(shape)));

  if (shape.length === 1) {
    return map(matrix, () => Math.random());
  }

  return matrix;
}

export let matrixNDShape: Array<number> = [4, 4, 4];

export let matrixND: Array<any> = createMatrix(matrixNDShape);

let array = new NumpyArray<Array<Number>>(matrixND);

let newArray = array.reshape([8, 4, 2]);

console.log(newArray.shape);
