import ArrayUtils from '../utils/ArrayUtils';
import { inspect } from 'util';

export default class BaseArray<T> {
  data: T[];
  shape: number[];

  constructor(array: T[]) {
    this.data = array;
    this.shape = ArrayUtils.getShape(this.data);
  }

  public reshape(newShape: number[]) {
    const numElementsOriginal = ArrayUtils.getNumElements(this.shape);
    const numElementsNew = ArrayUtils.getNumElements(newShape);

    if (numElementsOriginal !== numElementsNew) {
      throw new Error('Original and new shape are different, cannot reshape.');
    }

    const reshaper = new ArrayUtils.Reshaper<T>(this.data, newShape);

    return new BaseArray<T>(reshaper.reshape());
  }

  public isSquare(): boolean {
    const [firstDim, ...otherDims] = this.shape;
    return otherDims.every(dimSize => dimSize === firstDim);
  }

  public ravel() {
    return this.data.flat(Infinity) as Array<T>;
  }

  public toString(): string {
    return `Shape: ${this.shape.toString()}`;
  }

  // This is done for custom string when printing the object
  [inspect.custom](): string {
    return this.toString();
  }
}
