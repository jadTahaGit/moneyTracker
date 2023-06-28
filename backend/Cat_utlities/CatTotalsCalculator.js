const calculateCategoryTotals = (transactions) => {
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    const { category, Amount } = transaction;

    if (!category) {
      console.log('Transaction has no category:', transaction);
      return; // Skip this transaction and continue to the next one
    }

    if (isNaN(Amount)) {
      console.log('Transaction amount is not a number:', transaction);
      return; // Skip this transaction and continue to the next one
    }

    if (categoryTotals.hasOwnProperty(category)) {
      categoryTotals[category] += Amount;
    } else {
      categoryTotals[category] = Amount;
    }
  });

  return categoryTotals;
};

module.exports = calculateCategoryTotals;
