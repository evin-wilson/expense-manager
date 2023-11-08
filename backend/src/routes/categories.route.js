import express from 'express';

import {
  addNewAccount,
  addNewCategory,
  deleteAccounts,
  deleteCategories,
  getAccount,
  getCategory,
  updateAccounts,
  updateCategories,
} from '../controller/categories.contoller.js';

const categoryRouter = express.Router();

categoryRouter.get('/accounts', getAccount);
categoryRouter.get('/categories', getCategory);
categoryRouter.post('/add-accounts', addNewAccount);
categoryRouter.post('/add-categories', addNewCategory);
categoryRouter.put('/accounts/:account', updateAccounts);
categoryRouter.put('/categories/:category', updateCategories);
categoryRouter.delete('/delete-accounts/:account', deleteAccounts);
categoryRouter.delete('/delete-categories/:category', deleteCategories);

export default categoryRouter;
