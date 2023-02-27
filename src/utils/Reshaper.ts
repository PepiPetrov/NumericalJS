export default class Reshaper<T> {
  private data: T[];
  private newShape: Array<number>;

  constructor(data: T[], newShape: Array<number>) {
    this.data = data.flat(Infinity) as T[];
    this.newShape = newShape;
  }

  public reshape(): T[] {
    return this.unflattenArray(this.data, this.newShape);
  }

  private unflattenArray(arr: Array<T>, dim: Array<number>) {
    let elemIndex = 0;

    if (!dim || !arr) return [];

    const nest = (dimIndex: number): Array<any> => {
      let result: Array<any> = [];

      if (dimIndex === dim.length - 1) {
        for (let i = elemIndex; i < elemIndex + dim[dimIndex]; i++) {
          result.push(arr[i]);
        }
        elemIndex += dim[dimIndex];
      } else {
        for (let i = 0; i < dim[dimIndex]; i++) {
          result.push(nest(dimIndex + 1));
        }
      }

      return result;
    };

    return nest(0);
  }
}
