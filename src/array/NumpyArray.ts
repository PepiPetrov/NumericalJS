import NumpyArrayUtils from './NumpyArrayUtils';

export default class NumpyArray<T> {
  data: Array<T>;
  shape: Array<number>;
  private _data: Array<any>;

  constructor(array: Array<T>) {
    this.data = array;
    this._data = array;
    this.shape = NumpyArrayUtils.getShape(this._data);
  }

  public reshape(newShape: Array<number>) {
    let numElementsOriginal = NumpyArrayUtils.getElements(this.shape);
    let numElementsNew = NumpyArrayUtils.getElements(newShape);

    if (numElementsOriginal != numElementsNew) {
      throw new Error('Original and new shape are different, cannot reshape.');
    }

    let reshaper = new NumpyArrayUtils.Reshaper(
      this.data,
      newShape,
      this.shape
    );

    this.data = reshaper.reshape();
    this._data = this.data;
    this.shape = NumpyArrayUtils.getShape(this._data);
  }
}
