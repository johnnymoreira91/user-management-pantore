import { createUserController } from '@useCase/createUser';
import express from 'express';

const route = express.Router();

route.post('/', (req, res) => {
  return createUserController.handle(req, res);
})

export default route;