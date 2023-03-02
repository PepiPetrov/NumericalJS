//@ts-nocheck
import ArrayUtils from '../utils/ArrayUtils';

export class MathAddon<T> {
  public cumsum(squareElements: boolean = false): number {
    const flatData = this.data.flat(Infinity);
    let sum = 0;
    let c = 0;

    for (let i = 0; i < flatData.length; i++) {
      const y = squareElements ? flatData[i] * flatData[i] : flatData[i];
      const t = sum + y;
      if (Math.abs(sum) >= Math.abs(y)) {
        c += sum - t + y;
      } else {
        c += y - t + sum;
      }
      sum = t;
    }

    return sum + c;
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
    return this.cumsum() / ArrayUtils.getNumElements(this.shape);
  }

  public geometricMean() {
    const flatData = this.data.flat(Infinity);
    const n = flatData.length;
    let product = 1;

    for (let i = 0; i < n; i++) {
      product *= flatData[i];
    }

    return parseFloat(Math.pow(product, 1 / n).toFixed(13));
  }

  public min(): number {
    return Math.min(...(this.data.flat(Infinity) as Array<number>));
  }

  public max(): number {
    return Math.max(...(this.data.flat(Infinity) as Array<number>));
  }

  public extent() {
    return [this.min(), this.max()];
  }
}
