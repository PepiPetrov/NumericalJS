import { NDArray } from '../src/dataTypes/array/NDArray';

class MyAddon {}

describe('NDArray', () => {
  describe('reshape', () => {
    it('should reshape an array into a 2x3 array', () => {
      const array = new NDArray([1, 2, 3, 4, 5, 6]);
      const reshapedArray = array.reshape([2, 3]);
      expect(reshapedArray.shape).toEqual([2, 3]);
      expect(reshapedArray.data).toEqual([
        [1, 2, 3],
        [4, 5, 6],
      ]);
    });

    it('should throw an error when reshaping to a different size', () => {
      const array = new NDArray([1, 2, 3, 4, 5, 6]);
      expect(() => array.reshape([2, 2])).toThrowError(
        'Original and new shape are different, cannot reshape.'
      );
    });
  });

  describe('isSquare', () => {
    it('should return true for a square array', () => {
      const array = new NDArray([
        [1, 2],
        [3, 4],
      ]);
      expect(array.isSquare()).toBe(true);
    });

    it('should return false for a non-square array', () => {
      const array = new NDArray([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      expect(array.isSquare()).toBe(false);
    });
  });

  describe('ravel', () => {
    it('should flatten a 2x3 array into a 1D array', () => {
      const array = new NDArray([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      const flattenedArray = array.ravel();
      expect(flattenedArray.shape).toEqual([6]);
      expect(flattenedArray.data).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('toString', () => {
    it('should return a string representation of the array shape', () => {
      const array = new NDArray([1, 2, 3]);
      expect(array.toString()).toBe('Shape: 3');
    });
  });

  describe('map', () => {
    it('should apply a function to each element of the array', () => {
      const arr = new NDArray<number>([1, 2, 3]);
      const mapped = arr.map(x => x * 2);
      expect(mapped.data).toEqual([2, 4, 6]);
    });

    it('should work with non-numeric types', () => {
      const arr = new NDArray<string>(['foo', 'bar']);
      const mapped = arr.map(str => str.toUpperCase());
      expect(mapped.data).toEqual(['FOO', 'BAR']);
    });

    it('should preserve addons', () => {
      const arr = new NDArray<number>([1, 2, 3]);
      arr.addAddon(MyAddon, 'MyAddon');
      const mapped = arr.map(x => x * 2);
      expect(mapped.getAddon('MyAddon')).toBe(MyAddon);
    });
  });
});
