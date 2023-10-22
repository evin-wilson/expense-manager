import express from 'express';
import { getAccount, getCategory } from '../controller/categories.contoller.js';

const categoryRouter = express.Router();

categoryRouter.get('/accounts', getAccount);
categoryRouter.get('/categories', getCategory);

export default categoryRouter;
