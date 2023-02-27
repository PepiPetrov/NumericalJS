export default function createMatrix(shape: number[]): any {
  if (shape.length === 0) {
    return null;
  }

  const matrix = Array.from({ length: shape[0] }, () =>
    createMatrix(shape.slice(1))
  );

  if (shape.length === 1) {
    return matrix.map(() => Math.random());
  }

  return matrix;
}
