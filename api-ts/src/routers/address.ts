import { Router } from 'express';
import AddressController from '../controllers/address';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.get('/', addressController.list);
addressRouter.get('/csv', addressController.exporCsv);
addressRouter.get('/:id', addressController.getById);
addressRouter.post('/create', addressController.createAddress);
addressRouter.patch('/update', addressController.updateAddress);
addressRouter.delete('/delete', addressController.deleteAddress);

export default addressRouter;
