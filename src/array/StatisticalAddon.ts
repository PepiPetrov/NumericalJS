import ArrayUtils from '../utils/ArrayUtils';
import MathAddon from './MathAddon';

export default class StatisticalAddon<T> extends MathAddon<T> {
  public variance(): number {
    const numElements = ArrayUtils.getNumElements(this.shape);
    const variance = this.cumsum(true) / numElements - Math.pow(this.mean(), 2);
    return variance;
  }
  public stdev(): number {
    return Math.sqrt(this.variance());
  }

  public median() {
    const arr = this.ravel().slice() as Array<any>;
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
}
