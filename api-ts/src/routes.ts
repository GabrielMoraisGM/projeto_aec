import { Router } from 'express';

import usersRouter from './routers/users';
import addressRouter from './routers/address';

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/address', addressRouter)

export default routes;