import NDArray from '../src/array';
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
});
