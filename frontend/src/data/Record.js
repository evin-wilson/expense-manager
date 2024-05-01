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

let counter = 0;

class Record {
  constructor(transaction, date, amount, category, note, description) {
    this.id = this.generateUniqueId();
    this.createdTs = getIsoDateTime();
    this.transaction = transaction || 'expense';
    this.date = date || getIsoDateTime();
    this.amount = amount || 0.0;
    this.category = category || '';
    this.note = note || '';
    this.description = description || '';
  }
  generateUniqueId() {
    const timestamp = Date.now();
    counter++;
    return `record_${timestamp}_${counter}`;
  }
}

export default Record;
