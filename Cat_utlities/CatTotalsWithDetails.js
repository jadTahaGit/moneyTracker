const showAllTransPerCategory = (transactions) => {
  const categoryData = {};

  transactions.forEach((transaction) => {
    const { category } = transaction;

    if (!category) {
      console.warn("Transaction has no category:", transaction);
      return; // Skip this transaction and continue to the next one
    }

    if (!categoryData.hasOwnProperty(category)) {
      categoryData[category] = {
        totalAmount: 0,
        transactions: [],
      };
    }

    categoryData[category].transactions.push(transaction);
  });

  return categoryData;
};

module.exports = showAllTransPerCategory;
