import express from 'express';

import {
  addTransaction,
  allTransactions,
  deleteTransaction,
  findByCreatedAt,
  sumOfAllTransactions,
  updateTransaction,
} from '../controller/transaction.contoller.js';

const router = express.Router();

router.get('/', allTransactions);
router.get('/grandsum', sumOfAllTransactions);
router.get('/:createdAt', findByCreatedAt);
router.post('/addTransaction', addTransaction);
router.put('/updateTransaction/:createdAt', updateTransaction);
router.delete('/deleteTransaction/:createdAt', deleteTransaction);

export default router;
