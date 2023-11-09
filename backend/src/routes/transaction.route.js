import express from 'express';

import {
  addTransaction,
  deleteTransaction,
  findByCreatedAt,
  updateTransaction,
} from '../controller/transaction.contoller.js';

const router = express.Router();

router.get('/:createdAt', findByCreatedAt);
router.post('/addTransaction', addTransaction);
router.put('/updateTransaction/:createdAt', updateTransaction);
router.delete('/deleteTransaction/:createdAt', deleteTransaction);

export default router;
