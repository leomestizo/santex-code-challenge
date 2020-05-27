export const capitalizeOnlyFirstLetter = (word) => {
  const firstLetter = word.charAt(0).toUpperCase();
  const rest = word.substring(1, word.length).toLowerCase();

  return firstLetter + rest;
};
