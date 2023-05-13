import Record from './Record';

export const expenseOption = [
  { value: 'food', label: 'Food' },
  { value: 'houseHold', label: 'Household' },
  { value: 'socialLife', label: 'Social life' },
  { value: 'health', label: 'Health' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'debt', label: 'Debt' },
  { value: 'other', label: 'Other' },
];

export const incomeOption = [
  { value: 'salary', label: 'Salary' },
  { value: 'credits', label: 'Credits' },
  { value: 'allowance', label: 'Allowance' },
  { value: 'bonus', label: 'Bonus' },
  { value: 'other', label: 'Other' },
];

export const transactions = [
  new Record('expense', '2023-04-08T21:16', 500, 'food', 'Mandhi', ''),
  new Record('expense', '2023-04-07T21:16', 1500, 'houseHold', 'rent', ''),
  new Record('expense', '2023-04-07T21:16', 150, 'food', 'chips', ''),
  new Record('expense', '2023-04-07T21:16', 1500, 'socialLife', 'friend', ''),
  new Record('expense', '2023-04-07T21:16', 50, 'other', 'arila', ''),
  new Record('expense', '2023-03-06T21:16', 10, 'food', 'chaya', ''),
  new Record('income', '2023-03-06T09:15', 100000, 'Salary', '', ''),
  new Record('income', '2023-03-06T21:16', 1000, 'credits', 'friend', ''),
  new Record('income', '2023-05-06T21:16', 1000, 'credits', 'friend', ''),
  new Record('income', '2023-05-05T21:16', 5000, 'Salary', 'Salary', ''),
  new Record('expense', '2023-05-06T21:16', 10, 'food', 'chaya', ''),
  new Record('expense', '2023-05-06T21:16', 500, 'health', 'medicine', ''),
];
