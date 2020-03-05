import { UserController } from '../controller/UserController';
import { Router } from 'express';
import passport from '../middlewares/passport';
import verifyToken from '../middlewares/verifyToken';

const api = Router();

api.get(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    UserController.all,
);
api.get(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    UserController.one,
);
api.post('/', UserController.post);
api.patch(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    UserController.update,
);
api.delete(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    UserController.deleteUser,
);
api.put(
    '/resetPassword',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    UserController.resetPassword,
);

export default api;
