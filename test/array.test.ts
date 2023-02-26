import NumpyArray from '../src/array/NumpyArray';
import {
  matrix2D,
  matrix2DShape,
  matrixND,
  matrixNDShape,
} from './utils/matrices';

describe('NumpyArray', () => {
  it('gives correct shape for 2D arrays', () => {
    let array = new NumpyArray<Array<Number>>(matrix2D);

    expect(array.shape).toEqual(matrix2DShape);
  });

  it(`gives correct shape for ND arrays (the test is performed with a matrix of shape ${matrixNDShape})`, () => {
    let array = new NumpyArray<Array<any>>(matrixND);

    expect(array.shape).toEqual(matrixNDShape);
  });

  it('reshapes 2D arrays in 1D arrays', () => {
    let array = new NumpyArray<Array<Number>>(matrix2D);

    let newArray = array.reshape([4]);

    expect(newArray.shape).toEqual([4]);
  });

  it('reshapes ND arrays to other ND arrays', () => {
    let array = new NumpyArray<Array<Number>>(matrixND);

    let newArray = array.reshape([8, 2, 4]);

    expect(newArray.shape).toEqual([8, 2, 4]);
  });

  it('flatten method works as expected for 2D arrays', () => {
    let flatMatrix2D = matrix2D.flat(2);
    let array = new NumpyArray<any>(matrix2D);

    expect(array.flatten()).toEqual(flatMatrix2D);
  });

  it('flatten method works as expected for ND arrays', () => {
    let flatMatrixND = matrixND.flat(3);
    let array = new NumpyArray<any>(matrixND);

    expect(array.flatten()).toEqual(flatMatrixND);
  });
});
