const similarityPercentage = (arrayA, arrayB) => 100 * arrayA.filter(Set.prototype.has, new Set(arrayB)).length / Math.max(arrayA.length, arrayB.length);

// In the recommandation process arr1 should be the needed features while arr2 are the saasFeatures
const numberOfCommunValues = (arr1, arr2) => {

  const merge = [ ...arr1, ...arr2 ];
  const results = merge.reduce((acc, cur) => {

    acc[cur] = (acc[cur] || 0) + 1;

    if (acc[cur] === 2) {

      acc.total += 1;

    }

    return acc;

  }, { total: 0 });

  return parseFloat(((results.total / arr1.length) * 100).toFixed(2));

};

const compareValues = (key, order = 'desc') => (a, b) => {

  if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(b, key)) {

    // property doesn't exist on either object
    return 0;

  }

  const varA = a[key];
  const varB = b[key];

  let comparison = 0;

  if (varA > varB) {

    comparison = 1;

  } else if (varA < varB) {

    comparison = -1;

  }

  return (
    (order === 'desc') ? (comparison * -1) : comparison
  );

};

export { similarityPercentage, compareValues, numberOfCommunValues };
