import Reshaper from './Reshaper';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
export default class NumpyArrayUtils {
  static Reshaper = Reshaper;

  static getShape(data: any[]): number[] {
    const dim = [];

    while (isArray(data)) {
      dim.push(data.length);
      data = data[0];
    }

    return dim;
  }

  static getNumElements(shape: number[]): number {
    return reduce(shape, (acc, val) => acc * val, 1);
  }
}
