import { PlantController } from '../controllers';
import { Router } from 'express';
import passport from '../middlewares/passport';
import verifyToken from '../middlewares/verifyToken';
import multerMiddleware from '../middlewares/multer';

const api = Router();

api.get(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    PlantController.all,
);
api.get(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    PlantController.one,
);
api.post('/', multerMiddleware, PlantController.post);

api.post('/searchByName', PlantController.searchPlantByName);
api.post('/searchByImg', multerMiddleware,PlantController.searchPlantByImage);
api.get(
    '/trefle/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    PlantController.oneTrefle,
);

export default api;
