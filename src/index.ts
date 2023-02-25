import NumpyArray from './array/NumpyArray';

export default class Numpy {
  static Array = NumpyArray;
}

var matrix: Array<any> = [
  [
    [-0.39490148, 0.14553113],
    [-1.56570925, 0.65206831],
  ],

  [
    [-1.20548858, 0.76422886],
    [-0.54680172, 1.46030235],
  ],
];

var array = new NumpyArray<Array<any>>(matrix);

array.reshape([4, 2]);
console.log(array.data.filter(x => x.length != 0));
