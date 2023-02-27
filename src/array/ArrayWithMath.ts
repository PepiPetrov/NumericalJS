import BaseArray from './BaseArray';
import ArrayUtils from '../utils/ArrayUtils';

export default class ArrayWithMath<T> extends BaseArray<T> {
  constructor(array: T[]) {
    super(array);
  }

  public mean(): number {
    return this.sumElements() / ArrayUtils.getNumElements(this.shape);
  }

  public sumElements() {
    const flatArray = this.data.flat(Infinity) as Array<number>;
    const elementsSum = flatArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return elementsSum;
  }
}
