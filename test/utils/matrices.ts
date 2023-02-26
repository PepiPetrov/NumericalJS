import createMatrix from './createMatrix';

export let matrix2DShape: Array<number> = [2, 2];
export let matrixNDShape: Array<number> = [4, 4, 4];

export let matrix2D: Array<any> = createMatrix(matrix2DShape);

export let matrixND: Array<any> = createMatrix(matrixNDShape);
