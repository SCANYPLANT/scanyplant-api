import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.slice(7);
        jwt.verify(token, process.env.jwtSecret as string, (err: Error) => {
            if (err)
                return res.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate token.',
                });
            next();
        });
    } else {
        return res
            .status(403)
            .send({ auth: false, message: 'No token provided.' });
    }
};
