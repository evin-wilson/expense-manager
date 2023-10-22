import express from 'express';
import { transactionDb } from '../db/database.js';
const router = express.Router();

router.get('/', (req, res) => {
  transactionDb.find({ date: '2023-10-22' }, (err, data) => {
    res.json(data);
  });
});

// router.post();

// router.put();

// router.delete();

export default router;
