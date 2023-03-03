import { NDArray } from '../src/dataTypes/array/NDArray';
import { StatisticalAddon } from '../src/addons';
describe('StatisticalAddon', () => {
  describe('variance()', () => {
    it('returns the correct variance', () => {
      const data = new NDArray<any>([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);

      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.variance()).toEqual(6.666666666666668);
    });
  });

  describe('std()', () => {
    it('returns the correct standard deviation', () => {
      const data = new NDArray<any>([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);

      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.std()).toEqual(2.5819888974716116);
    });
  });

  describe('median()', () => {
    it('returns the correct median', () => {
      const data = new NDArray<any>([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);

      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.median()).toEqual(5);
    });

    it('returns null if the data is empty', () => {
      const data = new NDArray([]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.median()).toBeNull();
    });
  });

  describe('rootMeanSquare()', () => {
    it('returns the correct root mean square', () => {
      const data = new NDArray([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.rootMeanSquare()).toEqual(3.8944404818493075);
    });
  });

  describe('mode()', () => {
    it('returns the correct mode', () => {
      const data = new NDArray([
        [1, 2, 2, 3],
        [3, 4, 5, 5],
      ]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.mode()).toEqual(2);
    });
  });

  describe('sampleSkewness()', () => {
    it('returns the correct sample skewness', () => {
      const data = new NDArray([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.sampleSkewness()).toEqual(0);
    });

    it('returns 0 if there are less than 3 data points', () => {
      const data = new NDArray([[1, 2]]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.sampleSkewness()).toEqual(0);
    });
  });

  describe('harmonicMean()', () => {
    it('returns the correct harmonic mean', () => {
      const data = new NDArray([
        [2, 4, 8],
        [16, 32, 64],
      ]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      expect(data.harmonicMean()).toEqual(6.095238095238095);
    });
  });

  describe('zscore()', () => {
    it('returns an array of z-scores when called on an array of numbers', () => {
      const data = new NDArray([1, 2, 3, 4, 5]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      const zscores = data.zscore();
      expect(zscores).toEqual([
        -1.414213562373095,
        -0.7071067811865475,
        0,
        0.7071067811865475,
        1.414213562373095,
      ]);
    });

    it('correctly handles an array with a single element', () => {
      const data = new NDArray([1]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      const zscores = data.zscore();
      expect(zscores).toEqual([NaN]);
    });

    it('correctly handles an array with all equal elements', () => {
      const data = new NDArray([1, 1, 1, 1, 1]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      const zscores = data.zscore();
      expect(zscores).toEqual([NaN, NaN, NaN, NaN, NaN]);
    });

    it('calculates z-score correctly for an array with negative numbers', () => {
      const data = new NDArray([-2, 4, -6, 8]);
      data.addAddon(StatisticalAddon, 'StatAddon');

      const zscores = data.zscore();

      expect(zscores).toEqual([
        -0.5570860145311556,
        0.5570860145311556,
        -1.299867367239363,
        1.299867367239363,
      ]);
    });
  });
});
