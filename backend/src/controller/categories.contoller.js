import { categoriesDb } from '../db/database.js';

const getAccount = (req, res) => {
  categoriesDb.find({ type: 'account' }, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json(data);
    }
  });
};

const getCategory = (req, res) => {
  categoriesDb.find({ type: 'category' }, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json(data);
    }
  });
};

export { getAccount, getCategory };
