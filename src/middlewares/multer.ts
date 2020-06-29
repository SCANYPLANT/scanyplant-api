import { NextFunction, Request, Response } from 'express';
import multer from 'multer';


export default async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {

    const upload = multer({ storage: multer.memoryStorage() }).single('image');

    upload(request, response, (err: any) => {
        if (err) next(err);
        next();
    });
};
