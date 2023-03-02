import NDArray from '../src/array';
import { MathAddon } from '../src/addons';

describe('MathAddon', () => {
  let data: NDArray<any>;

  beforeEach(() => {
    data = new NDArray<any>([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    data.addAddon(MathAddon, 'MathAddon');
  });

  describe('cumsum', () => {
    it('should return the correct sum of all elements', () => {
      const expectedSum = 45;
      const actualSum = data.cumsum();
      expect(actualSum).toBe(expectedSum);
    });

    it('should return the correct sum of squared elements', () => {
      const expectedSum = 285;
      const actualSum = data.cumsum(true);
      expect(actualSum).toBe(expectedSum);
    });
  });

  describe('cumprod', () => {
    it('should return the correct product of all elements', () => {
      const expectedProduct = 362880;
      const actualProduct = data.cumprod();
      expect(actualProduct).toBe(expectedProduct);
    });
  });

  describe('mean', () => {
    it('should return the correct mean of all elements', () => {
      const expectedMean = 5;
      const actualMean = data.mean();
      expect(actualMean).toBe(expectedMean);
    });
  });

  describe('geometricMean', () => {
    it('should return the correct geometric mean of all elements', () => {
      const expectedGeometricMean = 4.1471662743969;
      const actualGeometricMean = data.geometricMean();
      expect(actualGeometricMean).toBe(expectedGeometricMean);
    });
  });

  describe('min', () => {
    it('should return the minimum value of all elements', () => {
      const expectedMin = 1;
      const actualMin = data.min();
      expect(actualMin).toBe(expectedMin);
    });
  });

  describe('max', () => {
    it('should return the maximum value of all elements', () => {
      const expectedMax = 9;
      const actualMax = data.max();
      expect(actualMax).toBe(expectedMax);
    });
  });

  describe('extent', () => {
    it('should return the correct minimum and maximum values of all elements', () => {
      const expectedExtent = [1, 9];
      const actualExtent = data.extent();
      expect(actualExtent).toEqual(expectedExtent);
    });
  });
});
