export function getLeastReceiptStatusTime(channel) {
  return Object.values(channel.cachedReadReceiptStatus).sort(
    (a, b) => a > b
  )[0];
}
