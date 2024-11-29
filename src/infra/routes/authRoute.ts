import { createUserController } from '@useCase/createUser';
import { signinController } from '@useCase/signinUseCase';
import express from 'express';

const route = express.Router();

route.post('/signup', (req, res) => {
  return createUserController.handle(req, res);
})

route.post('/signin', (req, res) => {
  return signinController.handle(req, res);
})

export default route;