import { AddonManager } from '../addons';
import ArrayUtils from '../utils/ArrayUtils';
import { inspect } from 'util';

export default class NDArray<T> extends AddonManager {
  data: T[];
  shape: number[];

  constructor(array: T[]) {
    super();
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

    return this.createInstanceWithAddons(reshaper.reshape());
  }

  private createInstanceWithAddons(data: Array<any>): NDArray<any> {
    const array = new NDArray<any>(data);

    for (const [name, addon] of this.getEntries()) {
      array.addAddon(addon, name);
    }

    return array;
  }

  public isSquare(): boolean {
    const [firstDim, ...otherDims] = this.shape;
    return otherDims.every(dimSize => dimSize === firstDim);
  }

  public ravel() {
    return new NDArray(this.data.flat(Infinity) as Array<any>);
  }

  public toString(): string {
    return `Shape: ${this.shape.toString()}`;
  }

  // This is done for custom string when printing the object
  [inspect.custom](): string {
    return this.toString();
  }
}
