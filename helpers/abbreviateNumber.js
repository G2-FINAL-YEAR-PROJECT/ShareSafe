export function abbreviateNumber(number) {
  const SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "QQ", "QQQ"];

  // What tier? (determines SI symbol)
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

  // if zero, we don't need a suffix
  if (tier === 0) return number.toLocaleString();

  // Calculate the index for SI_SYMBOL
  const siIndex = Math.floor(tier / 3);

  // Check if the index exceeds the available SI symbols
  if (siIndex >= SI_SYMBOL.length) {
    return "Number too large";
  }

  // Use the appropriate suffix and scale for the SI symbol
  const suffix = SI_SYMBOL[siIndex];
  const scale = Math.pow(10, siIndex * 3);

  // format the number and add commas
  const scaledNumber = number / scale;

  // Avoid appending "undefined" if scaledNumber is not a valid finite number
  if (!isFinite(scaledNumber)) return "Invalid Number";

  const formattedNumber = scaledNumber.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return `${formattedNumber}${suffix}`;
}
