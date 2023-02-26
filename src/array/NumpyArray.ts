import every from 'lodash/every';
import NumpyArrayUtils from './NumpyArrayUtils';
import * as util from 'util';
export default class NumpyArray<T> {
  data: T[];
  shape: number[];

  constructor(array: T[]) {
    this.data = array;
    this.shape = NumpyArrayUtils.getShape(this.data);
  }

  public reshape(newShape: number[]) {
    const numElementsOriginal = this.getNumElements(this.shape);
    const numElementsNew = this.getNumElements(newShape);

    if (numElementsOriginal !== numElementsNew) {
      throw new Error('Original and new shape are different, cannot reshape.');
    }

    const reshaper = new NumpyArrayUtils.Reshaper<T>(
      this.data,
      newShape,
      this.shape
    );

    return new NumpyArray<T>(reshaper.reshape());
  }

  public isSquare(): boolean {
    const [firstDim, ...otherDims] = this.shape;
    return every(otherDims, dimSize => dimSize === firstDim);
  }

  public flatten() {
    return this.data.flat(this.shape.length);
  }

  public toString() {
    return `Shape: ${this.shape.toString()}`;
  }

  // This is done for custom string when printing the object
  [util.inspect.custom](): string {
    return this.toString();
  }

  private getNumElements(shape: number[]): number {
    return NumpyArrayUtils.getNumElements(shape);
  }
}
