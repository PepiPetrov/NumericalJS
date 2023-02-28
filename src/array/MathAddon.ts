import BaseArray from './BaseArray';
import ArrayUtils from '../utils/ArrayUtils';

export default class MathAddon<T> extends BaseArray<T> {
  public cumsum(squareElements: boolean = false) {
    return this.data.flat(Infinity).reduce((accumulator, currentValue) => {
      if (typeof currentValue === 'number') {
        return (
          accumulator + (squareElements ? currentValue ** 2 : currentValue)
        );
      } else {
        return accumulator;
      }
    }, 0);
  }

  public cumprod() {
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
    return this.cumsum() / numElements;
  }

  public reshape(newShape: number[]) {
    return this.reshapeAndReturnBaseArray(newShape) as MathAddon<T>;
  }

  public median() {
    const arr = this.ravel().slice() as Array<any>;
    if (arr.length == 0) {
      return null;
    }
    arr.sort((a, b) => a - b);
    const midpoint = Math.floor(arr.length / 2);
    const median =
      arr.length % 2 === 1
        ? arr[midpoint]
        : (arr[midpoint - 1] + arr[midpoint]) / 2;
    return median;
  }
}
