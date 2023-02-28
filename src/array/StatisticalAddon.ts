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
}
