const getcategoryDataForChart = (transactions) => {
  const categoryTotals = transactions.reduce((totals, transaction) => {
    if (transaction.transaction === 'expense') {
      totals[transaction.category] = totals[transaction.category] || 0;
      totals[transaction.category] += transaction.amount;
    }
    return totals;
  }, {});

  const categoryData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF7F', '#8B008B', '#FF4500'],
      },
    ],
  };

  return categoryData;
};

const getTransactionDataForChart = (transactions) => {
  // Calculate the total income and expenses
  const income = transactions.reduce((total, transaction) => {
    return transaction.transaction === 'income' ? total + transaction.amount : total;
  }, 0);
  const expenses = transactions.reduce((total, transaction) => {
    return transaction.transaction === 'expense' ? total + transaction.amount : total;
  }, 0);

  const incomeVsExpensesData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return incomeVsExpensesData;
};

export { getcategoryDataForChart, getTransactionDataForChart };
