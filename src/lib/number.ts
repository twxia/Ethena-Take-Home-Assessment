export function toFixed(num: number, fixed: number) {
  const scale = Math.pow(10, fixed || 0);
  return Math.floor(num * scale) / scale;
}
