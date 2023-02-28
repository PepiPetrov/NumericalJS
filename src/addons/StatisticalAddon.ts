import ArrayUtils from '../utils/ArrayUtils';
import { MathAddon } from './MathAddon';

export class StatisticalAddon<T> extends MathAddon<T> {
  public variance(): number {
    const numElements = ArrayUtils.getNumElements(this.shape);
    const variance = this.cumsum(true) / numElements - Math.pow(this.mean(), 2);
    return variance;
  }
  public std(): number {
    const variance = this.variance();
    return Math.sqrt(variance);
  }

  public median() {
    const arr = this.ravel().data.slice() as Array<any>;
    if (arr.length === 0) {
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

  public reshape(newShape: number[]) {
    return this.reshapeAndReturnNDArray(newShape) as StatisticalAddon<T>;
  }
}
