const calculateCategoryTotalsWithPillers = (transactions) => {
  const categoryTotals = {
    Expenses: 0,
    Savings: 0,
    Investments: 0,
    Income: 0,
  };

  transactions.forEach((transaction) => {
    const { category, Amount } = transaction;

    if (!category) {
      console.warn("Transaction has no category:", transaction);
      return; // Skip this transaction and continue to the next one
    }

    if (isNaN(Amount)) {
      console.warn("Transaction amount is not a number:", transaction);
      return; // Skip this transaction and continue to the next one
    }

    // Categorize transactions into top-level categories
    if (
      [
        "Supermarket",
        "Transport",
        "Resturaunts",
        "Rent",
        "Insurance",
        "Haircut",
        "Health&Sport",
        "Phone",
        "State",
        "Freetime",
      ].includes(category)
    ) {
      categoryTotals.Expenses += Amount;
    } else if (category === "Saving") {
      categoryTotals.Savings += Amount;
    } else if (
      ["Education", "Software&BussinessInvestment"].includes(category)
    ) {
      categoryTotals.Investments += Amount;
    } else if (["Zendigma", "Bussines Income", "KFW"].includes(category)) {
      categoryTotals.Income += Amount;
    }
  });

  return categoryTotals;
};

module.exports = calculateCategoryTotalsWithPillers;
