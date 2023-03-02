import NDArray from '../src/array/';
import { MathAddon } from '../src/addons';

import { matrix2D } from './utils/matrices';

describe('NDArray enriched with mathematical methods Class', () => {
  it('mean method works as expected', () => {
    var array = new NDArray<any>(matrix2D);

    array.addAddon(MathAddon, 'MathAddon');

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

    array.addAddon(MathAddon, 'MathAddon');

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    expect(array.cumsum()).toEqual(sumElementsFlattenedMatrix);
  });

  it('cumprod method works as expected', () => {
    var array = new NDArray<any>(matrix2D);

    array.addAddon(MathAddon, 'MathAddon');

    var flattenedMatrix = matrix2D.flat(Infinity);

    var sumElementsFlattenedMatrix = flattenedMatrix.reduce(
      (accumulator, currentValue) => accumulator * currentValue,
      1
    );

    expect(array.cumprod()).toEqual(sumElementsFlattenedMatrix);
  });
});
