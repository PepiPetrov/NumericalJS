import NDArray from '../src/array/';
import { StatisticalAddon } from '../src/addons';

describe('NDArray enriched with statistical methods Class', () => {
  describe('variance', () => {
    it('calculates the variance correctly for an array of numbers', () => {
      const data = [1, 2, 3, 4, 5];
      const array = new NDArray(data);

      array.addAddon(StatisticalAddon, 'StatAddon');
      expect(array.variance()).toEqual(2);
    });

    it('calculates the variance correctly for an array with negative numbers', () => {
      const data = [-1, 0, 1];
      const array = new NDArray(data);

      array.addAddon(StatisticalAddon, 'StatAddon');
      expect(array.variance()).toEqual(0.6666666666666666);
    });
  });

  describe('std', () => {
    it('calculates the standard deviation correctly for an array of numbers', () => {
      const data = [1, 2, 3, 4, 5];
      const array = new NDArray(data);

      array.addAddon(StatisticalAddon, 'StatAddon');

      expect(array.std()).toBeCloseTo(1.4142135623731, 4);
    });

    it('calculates the standard deviation correctly for an array with negative numbers', () => {
      const data = [-1, 0, 1];
      const array = new NDArray(data);

      array.addAddon(StatisticalAddon, 'StatAddon');

      expect(array.std()).toEqual(0.816496580927726);
    });
  });

  describe('median', () => {
    it('calculates the median correctly for an array of odd length', () => {
      const data = [1, 2, 3, 4, 5];
      const array = new NDArray(data);

      array.addAddon(StatisticalAddon, 'StatAddon');
      expect(array.median()).toEqual(3);
    });

    it('calculates the median correctly for an array of even length', () => {
      const data = [1, 2, 3, 4];
      const array = new NDArray(data);

      array.addAddon(StatisticalAddon, 'StatAddon');
      expect(array.median()).toEqual(2.5);
    });

    it('returns null for an empty array', () => {
      const data: number[] = [];
      const array = new NDArray(data);

      array.addAddon(StatisticalAddon, 'StatAddon');
      expect(array.median()).toBeNull();
    });
  });
});
