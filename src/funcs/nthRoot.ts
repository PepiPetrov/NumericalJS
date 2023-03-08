export default function nthRoot(x: number, n: number) {
  if (x < 0 && n % 2 !== 1) return NaN; // Not well defined
  return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1 / n);
}
