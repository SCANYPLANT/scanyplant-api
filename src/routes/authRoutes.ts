import { Router } from 'express';
import { AuthController } from '../controllers';

const api = Router();

api.post('/login', AuthController.login);

api.post('/checkPassword', AuthController.checkPassword);

api.put('/changePassword/:id', AuthController.ChangePassword);

export default api;
