import express from 'express';

import { PORT } from './config.js';
import categoryRouter from './routes/categories.route.js';
import router from './routes/transaction.route.js';

const app = express();

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

app.use(express.json());

app.use('/transaction', router);
app.use('/category', categoryRouter);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'OK' });
});

export default app;
