const getIsoDateTime = () => {
  const now = new Date();
  const isoDateTime =
    now.getFullYear() +
    '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + now.getDate()).slice(-2) +
    'T' +
    ('0' + now.getHours()).slice(-2) +
    ':' +
    ('0' + now.getMinutes()).slice(-2);
  return isoDateTime;
};

const Record = {
  transaction: 'expense',
  date: getIsoDateTime(),
  createdTs: getIsoDateTime(),
  amount: 10,
  category: 'food',
  note: '',
  description: '',
};

export default Record;
