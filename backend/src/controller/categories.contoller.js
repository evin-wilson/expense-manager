import { categoriesDb } from '../db/database.js';

const getAccount = (req, res) => {
  findDocuments({ type: 'account' })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).send({ error: err }));
};

const getCategory = (req, res) => {
  findDocuments({ type: 'category' })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).send({ error: err }));
};

const findDocuments = (query) => {
  return new Promise((resolve, reject) => {
    categoriesDb.find(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const updateDocument = (query, data) => {
  return new Promise((resolve, reject) => {
    categoriesDb.update(query, { $set: data }, (err, noOfUpdates) => {
      if (err) {
        reject(err);
      } else {
        resolve(noOfUpdates);
      }
    });
  });
};

const deleteDocument = (query) => {
  return new Promise((resolve, reject) => {
    categoriesDb.remove(query, (err, numRemoved) => {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
};

const addNewAccount = (req, res) => {
  const account = req.body;

  if (!validateAccount(account)) {
    res.status(404).send({ error: 'Invalid account data' });
    return;
  }

  categoriesDb.find({ name: account.name }, (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Some DB issues !' });
    } else {
      if (data.length === 0) {
        categoriesDb.insert(account, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: 'not able to insert the data' });
          } else {
            res.status(200).send({ message: 'Successfully inserted the data' });
          }
        });
      } else {
        res.status(500).send({ error: 'Data already present' });
      }
    }
  });
};

const addNewCategory = (req, res) => {
  const category = req.body;

  if (!validateCategory(category)) {
    res.status(404).send({ error: 'Invalid category data' });
    return;
  }

  categoriesDb.find({ name: category.name }, (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Some DB issues !' });
    } else {
      if (data.length === 0) {
        categoriesDb.insert(category, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: 'not able to insert the data' });
          } else {
            res.status(200).send({ message: 'Successfully inserted the data' });
          }
        });
      } else {
        res.status(500).send({ error: 'Data already present' });
      }
    }
  });
};

const updateAccounts = (req, res) => {
  const account = req.body;
  updateDocument({ type: 'account', name: req.params.account }, account)
    .then({
      message: 'account updated successfully',
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err });
    });
};

const updateCategories = (req, res) => {
  const categories = req.body;
  updateDocument({ type: 'category', name: req.params.category }, categories)
    .then(() =>
      res.json({
        message: 'category updated successfully',
      })
    )
    .catch((err) => res.status(500).send({ error: err }));
};

const deleteAccounts = (req, res) => {
  const account = req.body;
  deleteDocument({ type: 'account', name: req.params.account }, account)
    .then(() =>
      res.json({
        message: 'account deleted successfully',
      })
    )
    .catch((err) => res.status(500).send({ error: err }));
};

const deleteCategories = (req, res) => {
  const categories = req.body;
  deleteDocument({ type: 'category', name: req.params.category }, categories)
    .then(() =>
      res.json({
        message: 'category deleted successfully',
      })
    )
    .catch((err) => res.status(500).send({ error: err }));
};

const validateAccount = (account) => {
  if (account.type !== 'account') {
    return false;
  }
  if (account.name.trim() === '') {
    return false;
  }
  return true;
};

const validateCategory = (category) => {
  if (category.type !== 'category') {
    return false;
  }
  if (category.name.trim() === '') {
    return false;
  }
  if (
    category.hasSubCategory === true &&
    (category.subCategory === undefined || category.subCategory.length === 0)
  ) {
    return false;
  }
  return true;
};

export {
  getAccount,
  getCategory,
  addNewAccount,
  addNewCategory,
  updateAccounts,
  updateCategories,
  deleteAccounts,
  deleteCategories,
};
