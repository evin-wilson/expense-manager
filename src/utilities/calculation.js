import { DateTime } from 'luxon';

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

export const groupByMonth = (transactions) => {
  const transactionMap = new Map();

  transactions.forEach((transaction, index) => {
    const month = transaction.date.slice(0, 7); // extract month from the date

    if (!transactionMap.has(month)) {
      transactionMap.set(month, []);
    }

    transactionMap.get(month).push({ ...transaction, index });
  });
  return transactionMap;
};

/**
 *
 * @param {Date} monthselected
 * @param {Array} transactionRecords
 * @returns returns the carryover amount for the given month from the previous month
 */
export const getCarryoverAmount = (monthselected, transactionRecords) => {
  let carryoverAmount = 0.0;
  let previousMonth = DateTime.fromJSDate(monthselected).minus({ month: 1 }).toFormat('yyyy-MM');
  let transactionByMonth = groupByMonth(transactionRecords);

  // Sort the map based on keys
  var sortedEntries = [...transactionByMonth.entries()].sort();
  var sortedMap = new Map(sortedEntries);

  sortedMap.forEach((records, date) => {
    let obj = getTotalIncomeAndExpense(records);
    carryoverAmount = carryoverAmount + (obj.income - obj.expense);
    sortedMap.set(date, carryoverAmount);
  });

  if (sortedMap.has(previousMonth)) {
    return sortedMap.get(previousMonth);
  } else {
    let lastKey = [...sortedMap.keys()][sortedMap.size - 1];
    return previousMonth > lastKey ? sortedMap.get(lastKey) : 0.0;
    /**
     * TODO
     * The case where previousmonth not in the map and it lies in between the range of months calculated if not done
     * suppose previousmonth = '2023-08' and map contains keys as ['2023-06', '2023-09']. this time the carryover
     * will be calculated as 0.0 but instead it should have to be carryover from '2023-06'
     */
  }
};
