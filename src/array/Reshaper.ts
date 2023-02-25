export default class Reshaper {
  private data: Array<any>;
  private newShape: Array<number>;
  private elemIndex: number;

  constructor(
    data: Array<any>,
    newShape: Array<number>,
    oldShape: Array<number>
  ) {
    this.data = data.flat(oldShape.length);
    this.newShape = newShape;
    this.elemIndex = 0;
  }

  public reshape(): any[] {
    return this.nestDimensions(0, this.data, this.newShape);
  }

  private nestDimensions(
    dimIndex: number,
    arr: Array<any>,
    dim: Array<number>
  ): Array<any> {
    let result: Array<any> = [];

    if (dimIndex === dim.length - 1) {
      result = result.concat(
        arr.slice(this.elemIndex, this.elemIndex + dim[dimIndex])
      );
      this.elemIndex += dim[dimIndex];
    } else {
      for (let i = 0; i < dim[dimIndex]; i++) {
        result.push(this.nestDimensions(dimIndex + 1, arr, dim));
      }
    }

    return result;
  }
}
