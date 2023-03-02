//@ts-nocheck
import ArrayUtils from '../utils/ArrayUtils';
import { MathAddon } from './MathAddon';

export class StatisticalAddon<T> extends MathAddon<T> {
  requiredAddons: Array<any> = [MathAddon];

  public variance(): number {
    const numElements = ArrayUtils.getNumElements(this.shape);
    const variance = this.cumsum(true) / numElements - Math.pow(this.mean(), 2);
    return variance;
  }

  public std(): number {
    return Math.sqrt(this.variance());
  }

  public median() {
    const arr = this.data.flat(Infinity).slice() as Array<any>;
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

  public rootMeanSquare() {
    const flatData = this.data.flat(Infinity);

    let squares = flatData.map(val => val * val);

    let sum = squares.reduce((acc, val) => acc + val);

    let mean = sum / flatData.length;

    return Math.sqrt(mean);
  }

  public mode() {
    if (!Map) throw new Error('Map is not supported in this environment');

    const counts = new Map();
    let mode;
    let maxCount = 0;

    for (const val of this.data.flat(Infinity)) {
      const count = (counts.get(val) || 0) + 1;
      counts.set(val, count);

      if (count > maxCount) {
        maxCount = count;
        mode = val;
      }
    }

    return mode;
  }

  public sampleSkewness(): number {
    const flatData = this.data.flat(Infinity);
    const n = flatData.length;

    if (n < 3) {
      return 0;
    }

    const mean = this.mean();
    const std = this.std();
    const skewness =
      flatData.reduce((sum, val) => sum + (val - mean) ** 3, 0) /
      (n - 1) /
      std ** 3;

    return skewness;
  }

  public harmonicMean() {
    const flatData = this.data.flat(Infinity);

    let sum = 0;
    for (let i = 0; i < flatData.length; i++) {
      sum += 1 / flatData[i];
    }
    return flatData.length / sum;
  }
}
