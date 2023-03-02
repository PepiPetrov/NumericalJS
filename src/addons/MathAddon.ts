// @ts-nocheck
import ArrayUtils from '../utils/ArrayUtils';

export class MathAddon<T> {
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
}
