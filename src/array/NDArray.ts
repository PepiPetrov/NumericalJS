import ArrayUtils from '../utils/ArrayUtils';
import { inspect } from 'util';

export default class NDArray<T> {
  data: T[];
  shape: number[];
  [key: string]: any;

  constructor(array: T[]) {
    this.data = array;
    this.shape = ArrayUtils.getShape(this.data);
  }

  public addAddon(addonClass: any) {
    let currentPrototype = Object.getPrototypeOf(this);
    while (currentPrototype !== Object.prototype) {
      if (currentPrototype === addonClass.prototype) {
        // addon already exists in prototype chain, skip
        return;
      }
      currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    const addonKeys = Object.getOwnPropertyNames(addonClass.prototype).filter(
      prop => prop !== 'constructor'
    );

    for (const key of addonKeys) {
      const descriptor = Object.getOwnPropertyDescriptor(
        addonClass.prototype,
        key
      );
      if (!descriptor) {
        continue;
      }

      if (typeof descriptor.value === 'function') {
        this[key] = descriptor.value.bind(this);
      } else {
        this[key] = descriptor.value;
      }
    }
  }

  protected reshapeAndReturnNDArray(newShape: number[]) {
    const numElementsOriginal = ArrayUtils.getNumElements(this.shape);
    const numElementsNew = ArrayUtils.getNumElements(newShape);

    if (numElementsOriginal !== numElementsNew) {
      throw new Error('Original and new shape are different, cannot reshape.');
    }

    const reshaper = new ArrayUtils.Reshaper<T>(this.data, newShape);

    return new NDArray<T>(reshaper.reshape());
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
