/**
 * Calculates income and expense from an array of records.
 *
 * @param {Array} records - The array of records to calculate from.
 * @returns {Object} An object with `income` and `expense` properties.
 */
export const getTotalIncomeAndExpense = (records) => {
  let income = 0.0;
  let expense = 0.0;
  records.map((record) => {
    if (record.transaction === 'income') {
      income += record.amount;
    } else {
      expense += record.amount;
    }
  });
  return { income, expense };
};

/**
 * this function is to get transactions record group by month and date
 * return value is a map with month (yyyy-mm) as key and
 * value is a map of date as key and Array of records as value
 * @returns {Map<string, Map<string, Array>>}
 */
export const groupedTransactions = (transactions) => {
  const transactionMap = new Map();

  transactions.forEach((transaction, index) => {
    const month = transaction.date.slice(0, 7); // extract month from the date
    const date = transaction.date.slice(0, 10); // extract date from the date

    if (!transactionMap.has(month)) {
      transactionMap.set(month, new Map());
    }

    if (!transactionMap.get(month).has(date)) {
      transactionMap.get(month).set(date, []);
    }

    transactionMap
      .get(month)
      .get(date)
      .push({ ...transaction, index });
  });
  // console.log(transactionMap);
  return transactionMap;
};
