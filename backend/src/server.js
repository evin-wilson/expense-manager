import express from 'express';

import { PORT } from './config.js';
import categoryRouter from './routes/categories.route.js';
import router from './routes/transaction.route.js';

const app = express();

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

app.use('/transaction', router);
app.use('/category', categoryRouter);
