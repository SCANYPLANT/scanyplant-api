import Express, { Router } from 'express';
import user from './userRoutes';
import auth from './authRoutes';
import plant from './plantRoutes';

const api = Router();

api.get('/', (req: Express.Request, res: Express.Response) => {
    res.json({
        'project Name': 'myS3',
        author: ['Ibrahima Dansoko'],
        contributors: ['Benjamin Benoit', 'Yassine Fatihi'],
        apiRoute: {
            Auth: [
                {
                    name: 'login',
                    method: 'Post',
                    url: `${process.env.HOST}/api/auth/login`,
                    protected: 'No',
                },
                {
                    name: 'check user for change password',
                    method: 'Post',
                    url: `${process.env.HOST}/api/auth/checkPassword`,
                    protected: 'No',
                },
                {
                    name: 'change password',
                    method: 'Put',
                    url: `${process.env.HOST}/api/auth/changePassword/:id`,
                    protected: 'No',
                },
                {
                    name: 'reset password',
                    method: 'Put',
                    url: `${process.env.HOST}/api/users/resetPassword`,
                    protected: 'Yes',
                },
            ],
            Users: [
                {
                    name: 'Get All User',
                    method: 'Get',
                    url: `${process.env.HOST}/api/users`,
                    protected: 'Yes',
                },
                {
                    name: 'Get User by Id',
                    method: 'Get',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Post User',
                    method: 'Post',
                    url: `${process.env.HOST}/api/users`,
                    protected: 'Yes',
                },
                {
                    name: 'Update User by id',
                    method: 'Patch',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Delete User by id',
                    method: 'Delete',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Truncate user in bdd',
                    method: 'Delete',
                    warning: 'DEV only',
                    url: `${process.env.HOST}/api/users/truncate`,
                    protected: 'No',
                },
            ],
        },
    }).end();
});
api.use('/users', user);
api.use('/auth', auth);
api.use('/plant', plant);

export default api;
