import Reshaper from './Reshaper';

export default class ArrayUtils {
  static Reshaper = Reshaper;

  static getShape(data: any[]): number[] {
    const dim = [];

    while (Array.isArray(data)) {
      dim.push(data.length);
      data = data[0];
    }

    return dim;
  }

  static getNumElements(shape: number[]): number {
    return shape.reduce((acc, val) => acc * val, 1);
  }
}
