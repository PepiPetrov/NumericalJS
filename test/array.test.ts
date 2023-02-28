import NDArray from '../src/array/';
import { MathAddon, StatisticalAddon } from '../src/addons';

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

    array.addAddon(MathAddon);

    let newArray = array.reshape([4]);

    expect(newArray.shape).toEqual([4]);
  });

  it('reshapes ND arrays to other ND arrays', () => {
    let array = new NDArray(matrixND);

    array.addAddon(MathAddon);

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

describe('NDArray enriched with mathematical methods Class', () => {
  it('mean method works as expected', () => {
    var array = new NDArray<any>(matrix2D);

    array.addAddon(MathAddon);

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    var mean = sumElementsFlattenedMatrix / flattenedMatrix.length;

    expect(array.mean()).toEqual(mean);
  });

  it('cumsum method works as expected', () => {
    var array = new NDArray<any>(matrix2D);

    array.addAddon(MathAddon);

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    expect(array.cumsum()).toEqual(sumElementsFlattenedMatrix);
  });

  it('cumprod method works as expected', () => {
    var array = new NDArray<any>(matrix2D);

    array.addAddon(MathAddon);

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator * currentValue,
      1
    );

    expect(array.cumprod()).toEqual(sumElementsFlattenedMatrix);
  });
});

describe('NDArray enriched with statistical methods Class', () => {
  describe('variance', () => {
    it('calculates the variance correctly for an array of numbers', () => {
      const data = [1, 2, 3, 4, 5];
      const array = new NDArray(data);
      array.addAddon(MathAddon);
      array.addAddon(StatisticalAddon);
      expect(array.variance()).toEqual(2);
    });

    it('calculates the variance correctly for an array with negative numbers', () => {
      const data = [-1, 0, 1];
      const array = new NDArray(data);
      array.addAddon(MathAddon);
      array.addAddon(StatisticalAddon);
      expect(array.variance()).toEqual(0.6666666666666666);
    });
  });

  describe('std', () => {
    it('calculates the standard deviation correctly for an array of numbers', () => {
      const data = [1, 2, 3, 4, 5];
      const array = new NDArray(data);

      array.addAddon(MathAddon);
      array.addAddon(StatisticalAddon);

      expect(array.std()).toBeCloseTo(1.4142135623731, 4);
    });

    it('calculates the standard deviation correctly for an array with negative numbers', () => {
      const data = [-1, 0, 1];
      const array = new NDArray(data);

      array.addAddon(MathAddon);
      array.addAddon(StatisticalAddon);

      expect(array.std()).toEqual(0.816496580927726);
    });
  });

  describe('median', () => {
    it('calculates the median correctly for an array of odd length', () => {
      const data = [1, 2, 3, 4, 5];
      const array = new NDArray(data);
      array.addAddon(MathAddon);
      array.addAddon(StatisticalAddon);
      expect(array.median()).toEqual(3);
    });

    it('calculates the median correctly for an array of even length', () => {
      const data = [1, 2, 3, 4];
      const array = new NDArray(data);
      array.addAddon(MathAddon);
      array.addAddon(StatisticalAddon);
      expect(array.median()).toEqual(2.5);
    });

    it('returns null for an empty array', () => {
      const data: number[] = [];
      const array = new NDArray(data);
      array.addAddon(MathAddon);
      array.addAddon(StatisticalAddon);
      expect(array.median()).toBeNull();
    });
  });
});
