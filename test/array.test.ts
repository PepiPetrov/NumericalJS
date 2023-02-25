import NumpyArray from '../src/array/NumpyArray';
describe('NumpyArray', () => {
  it('works for 2D arrays', () => {
    var matrix: Array<Array<Number>> = [
      [0.94145508, 2.1010396],
      [-1.15199592, -0.96834603],
    ];

    var array = new NumpyArray<Array<Number>>(matrix);

    expect(array.shape).toEqual([2, 2]);
  });

  it('works for N-D arrays (the test is performed with a matrix of shape [5, 10])', () => {
    var matrix: Array<Array<Number>> = [
      [
        1.37607622,
        -0.38041481,
        -0.04125991,
        -0.41169428,
        -0.15958365,
        2.22557481,
        0.44522915,
        -0.21794932,
        1.05477292,
        -2.01756668,
      ],
      [
        -0.60621435,
        0.08679438,
        0.59023817,
        -1.55717576,
        -0.76194878,
        -0.02671734,
        1.60478008,
        -2.32743418,
        0.9364801,
        0.9233455,
      ],
      [
        -1.5003885,
        0.34577495,
        -2.80785922,
        0.0342617,
        0.04218485,
        0.61002881,
        0.34485267,
        -0.08393315,
        -2.08387427,
        -1.10938067,
      ],
      [
        0.99629869,
        0.12249815,
        -0.27055923,
        1.09605684,
        0.951011,
        0.19495627,
        -0.56764283,
        -1.25880189,
        0.13425857,
        0.16636199,
      ],
      [
        1.26026117,
        -0.53251926,
        0.9711382,
        0.57793899,
        -0.1351348,
        0.0380332,
        0.50485495,
        -1.03941853,
        -1.66195781,
        0.38356917,
      ],
    ];

    var array = new NumpyArray<Array<Number>>(matrix);

    expect(array.shape).toEqual([5, 10]);
  });

  it('reshapes for 2D arrays in 1D arrays', () => {
    var matrix: Array<Array<Number>> = [
      [0.94145508, 2.1010396],
      [-1.15199592, -0.96834603],
    ];

    var array = new NumpyArray<Array<Number>>(matrix);

    array.reshape([4]);

    expect(array.shape).toEqual([4]);

    expect(array.data).toEqual(matrix.flat());
  });
});
