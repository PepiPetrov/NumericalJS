import BaseArray from './BaseArray';
import ArrayUtils from '../utils/ArrayUtils';

export default class ArrayWithMath<T> extends BaseArray<T> {
  private elementsSum: number;
  private elementsProd: number;

  constructor(array: T[]) {
    super(array);
    this.elementsSum = this.calculateElementsSum();
    this.elementsProd = this.calculateElementsProduct();
  }

  private calculateElementsSum() {
    return this.data.flat(Infinity).reduce((accumulator, currentValue) => {
      if (typeof currentValue === 'number') {
        return accumulator + currentValue;
      } else {
        return accumulator;
      }
    }, 0);
  }

  private calculateElementsProduct() {
    return this.data.flat(Infinity).reduce((accumulator, currentValue) => {
      if (typeof currentValue === 'number') {
        return accumulator * currentValue;
      } else {
        return accumulator;
      }
    }, 1);
  }

  public mean(): number {
    const numElements = ArrayUtils.getNumElements(this.shape);
    return this.elementsSum / numElements;
  }

  public cumsum() {
    return this.elementsSum;
  }

  public cumprod() {
    return this.elementsProd;
  }
}
