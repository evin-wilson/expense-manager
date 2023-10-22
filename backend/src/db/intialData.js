const transactionsSchema = {
  amount: { type: 'number', index: true },
  date: { type: 'string' },
  createdAt: { type: 'string', index: true },
  transaction: { type: 'string', index: true },
  account: { type: 'string' },
  category: { type: 'string', index: true },
  subCategory: { type: 'string', index: true },
  note: { type: 'string' },
  description: { type: 'string' },
};

const categoriesSchema = {
  type: { type: 'string', index: true },
  name: { type: 'string', index: true },
  hasSubCategory: { type: 'string' },
};

export const intial_transactions = [
  {
    amount: 120,
    date: '2023-10-22',
    createdAt: '2023-10-22T10:52:57.668Z',
    transaction: 'expense',
    account: 'savings',
    category: 'food',
    subCategory: 'breakfast',
    note: 'Masala Dhosa',
    description: '',
  },
  {
    amount: 200,
    date: '2023-10-05',
    createdAt: '2023-10-05T10:52:57.668Z',
    transaction: 'income',
    account: 'savings',
    category: 'salary',
    note: 'Salary',
    description: '',
  },
  {
    amount: 20,
    date: '2023-10-28',
    createdAt: '2023-10-28T10:52:57.668Z',
    transaction: 'expense',
    account: 'savings',
    category: 'me',
    subCategory: 'medicine',
    note: 'dolo',
    description: '',
  },
  {
    amount: 30,
    date: '2023-10-10',
    createdAt: '2023-10-10T10:52:57.668Z',
    transaction: 'liablity',
    account: 'savings',
    category: 'debt',
    note: 'antony',
    description: '',
  },
];

export const intial_categories = [
  {
    type: 'account',
    name: 'savings',
    hasSubCategory: false,
  },
  {
    type: 'account',
    name: 'money',
    hasSubCategory: false,
  },
  {
    type: 'account',
    name: 'credit card',
    hasSubCategory: false,
  },
  {
    type: 'category',
    name: 'food',
    hasSubCategory: true,
    subCategory: ['breakfast', 'lunch', 'tea'],
  },
  {
    type: 'category',
    name: 'movies',
    hasSubCategory: false,
  },
  {
    type: 'category',
    name: 'self',
    hasSubCategory: false,
  },
];
