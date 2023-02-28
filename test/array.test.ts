import StatisticalAddon from '../src/array/';
import {
  matrix2D,
  matrix2DShape,
  matrixND,
  matrixNDShape,
} from './utils/matrices';

describe('Base Array Class', () => {
  it('gives correct shape for 2D arrays', () => {
    let array = new StatisticalAddon<Array<Number>>(matrix2D);

    expect(array.shape).toEqual(matrix2DShape);
  });

  it(`gives correct shape for ND arrays (the test is performed with a matrix of shape ${matrixNDShape})`, () => {
    let array = new StatisticalAddon<Array<any>>(matrixND);

    expect(array.shape).toEqual(matrixNDShape);
  });

  it('reshapes 2D arrays in 1D arrays', () => {
    let array = new StatisticalAddon<StatisticalAddon<Number>>(matrix2D);

    let newArray = array.reshape([4]);

    expect(newArray.shape).toEqual([4]);
  });

  it('reshapes ND arrays to other ND arrays', () => {
    let array = new StatisticalAddon<StatisticalAddon<Number>>(matrixND);

    let newArray = array.reshape([8, 2, 4]);

    expect(newArray.shape).toEqual([8, 2, 4]);
  });

  it('flatten method works as expected for 2D arrays', () => {
    let flatMatrix2D = matrix2D.flat(2);
    let array = new StatisticalAddon<any>(matrix2D);

    expect(array.ravel()).toEqual(flatMatrix2D);
  });

  it('flatten method works as expected for ND arrays', () => {
    let flatMatrixND = matrixND.flat(3);
    let array = new StatisticalAddon<any>(matrixND);

    expect(array.ravel()).toEqual(flatMatrixND);
  });
});

describe('BaseArray enriched with mathematical methods Class', () => {
  it('mean method works as expected', () => {
    var array = new StatisticalAddon<any>(matrix2D);

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    var mean = sumElementsFlattenedMatrix / flattenedMatrix.length;

    expect(array.mean()).toEqual(mean);
  });

  it('cumsum method works as expected', () => {
    var array = new StatisticalAddon<any>(matrix2D);

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    expect(array.cumsum()).toEqual(sumElementsFlattenedMatrix);
  });

  it('cumprod method works as expected', () => {
    var array = new StatisticalAddon<any>(matrix2D);

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator * currentValue,
      1
    );

    expect(array.cumprod()).toEqual(sumElementsFlattenedMatrix);
  });
});
