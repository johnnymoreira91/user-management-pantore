import authMiddleware from '@infra/middleware/authmiddleware';
import { editUserController } from '@useCase/editUser';
import { listUserController } from '@useCase/listUserUseCase';
import express from 'express';

const route = express.Router();

route.use(authMiddleware)

route.get('/', (req, res) => {
  return listUserController.handle(req, res);
})

route.patch('/:id', (req, res) => {
  return editUserController.handle(req, res);
})

export default route;