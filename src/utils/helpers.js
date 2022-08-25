export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  //since colors is a array of arrays, we need to flatten it so we can see all the colors on one level and pull out the uniques colors
  if (type === 'colors') {
    unique = unique.flat();
  }
  return ['all', ...new Set(unique)];
};
