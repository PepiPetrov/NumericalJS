import NDArray from '../src/array/';

import {
  matrix2D,
  matrix2DShape,
  matrixND,
  matrixNDShape,
} from './utils/matrices';

describe('Base Array Class', () => {
  it('gives correct shape for 2D arrays', () => {
    let array = new NDArray(matrix2D);

    expect(array.shape).toEqual(matrix2DShape);
  });

  it(`gives correct shape for ND arrays (the test is performed with a matrix of shape ${matrixNDShape})`, () => {
    let array = new NDArray(matrixND);

    expect(array.shape).toEqual(matrixNDShape);
  });

  it('reshapes 2D arrays in 1D arrays', () => {
    let array = new NDArray(matrix2D);

    let newArray = array.reshape([4]);

    expect(newArray.shape).toEqual([4]);
  });

  it('reshapes ND arrays to other ND arrays', () => {
    let array = new NDArray(matrixND);

    let newArray = array.reshape([8, 2, 4]);

    expect(newArray.shape).toEqual([8, 2, 4]);
  });

  it('flatten method works as expected for 2D arrays', () => {
    let flatMatrix2D = matrix2D.flat(Infinity);
    let array = new NDArray<any>(matrix2D);

    expect(array.ravel().data).toEqual(flatMatrix2D);
  });

  it('flatten method works as expected for ND arrays', () => {
    let flatMatrixND = matrixND.flat(Infinity);
    let array = new NDArray<any>(matrixND);

    expect(array.ravel().data).toEqual(flatMatrixND);
  });
});
