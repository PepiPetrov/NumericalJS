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
