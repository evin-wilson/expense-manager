import { transactionDb } from '../db/database.js';

const findDocument = (query) => {
  return new Promise((resolve, reject) => {
    transactionDb.find(query, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// TODO: need proper validation
const validateTransaction = (transaction) => {
  return true;
};

const findByCreatedAt = (req, res) => {
  const createdAt = req.params.createdAt;

  findDocument({ createdAt: createdAt })
    .then((data) => res.json(data))
    .catch(() => {
      console.log(err);
      res.status(500).send({ error: 'some exception occur' });
    });
};

const addTransaction = (req, res) => {
  const transaction = req.body;

  if (!validateTransaction(transaction)) {
    res.status(400).send({ error: 'invalid transaction data !' });
    return;
  }

  findDocument({ createdAt: transaction.createdAt })
    .then((data) => {
      if (data.length === 0) {
        transactionDb.insert(transaction, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: 'some exception occur' });
          } else res.status(200).send({ message: 'Successfully inserted the data' });
        });
      } else res.status(409).send({ error: 'Data already present' });
    })
    .catch(() => res.status(500).send({ error: 'some exception occur' }));
};

const updateTransaction = (req, res) => {
  const updateTransaction = req.body;
  const createdAt = req.params.createdAt;

  transactionDb.update(
    { createdAt: createdAt },
    { $set: updateTransaction },
    (err, updateCount) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'some exception occur' });
      } else {
        if (updateCount > 0) res.status(200).send({ message: 'transaction updated successfully' });
        else res.status(404).send({ message: 'TransactionId is not valid !' });
      }
    }
  );
};

const deleteTransaction = (req, res) => {
  const createdAt = req.params.createdAt;

  transactionDb.remove({ createdAt: createdAt }, (err, delCount) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'some exception occur' });
    } else {
      if (delCount > 0) res.status(200).send({ message: 'transaction deleted successfully' });
      else res.status(404).send({ error: 'Transaction is not present !' });
    }
  });
};

export { findByCreatedAt, addTransaction, updateTransaction, deleteTransaction };
