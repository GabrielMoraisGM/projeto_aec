import { Router } from 'express';

import UsersController from '../controllers/users';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/user', usersController.list);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/user/login',usersController.loginUser)
usersRouter.post('/create', usersController.createUser);
usersRouter.patch('/update', usersController.updateUser);
usersRouter.delete('/delete', usersController.deleteUser);

export default usersRouter;
