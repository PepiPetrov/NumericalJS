import Reshaper from './Reshaper';

export default class NumpyArrayUtils {
  static Reshaper = Reshaper;
  static getShape(data: Array<any>): Array<number> {
    let _data = data;
    let dim = [];

    for (;;) {
      dim.push(_data.length);

      if (Array.isArray(_data[0])) {
        _data = _data[0];
      } else {
        break;
      }
    }

    return dim;
  }

  static getElements(shape: number[]) {
    let numElements: number = 1;

    for (let i = 0; i < shape.length; i++) {
      numElements *= shape[i];
    }

    return numElements;
  }
}
