export function capitalize(inputString) {
  const lowercaseString = inputString.toLowerCase();

  const resultString =
    lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);

  return resultString;
}
