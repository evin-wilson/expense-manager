import Datastore from 'nedb';

import { intial_categories, intial_transactions } from './intialData.js';

function loadData(db, data) {
  db.find({}, (err, existingData) => {
    if (err) {
      console.error(err);
    } else {
      if (existingData.length === 0) {
        // Data doesn't exist, so insert the initial data
        db.insert(data, (err, newDocs) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Initial data inserted');
          }
        });
      } else {
        console.log('Data already exists, skipping insertion.');
      }
    }
  });
}

const transactionDb = new Datastore({
  filename: './database/transaction.db',
  autoload: true,
});
// loading intial data for transaction
transactionDb.loadDatabase(loadData(transactionDb, intial_transactions));
transactionDb.ensureIndex({ fieldName: 'createdAt', unique: true });

const categoriesDb = new Datastore({
  filename: './database/categories.db',
  autoload: true,
});
// loading intial data for categories
categoriesDb.loadDatabase(loadData(categoriesDb, intial_categories));

export { transactionDb, categoriesDb };
