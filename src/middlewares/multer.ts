import { NextFunction, Request, Response } from 'express';
import multer from 'multer';


export default async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    // const storage: StorageEngine = multer.diskStorage({
    //     destination: async (
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         req: any,
    //         file: Express.Multer.File,
    //         cb: (error: Error | null, destination: string) => void,
    //     ): Promise<void> => {
    //         cb(null, 'public/images');
    //     },
    //     filename: async (
    //         req: Request,
    //         file: Express.Multer.File,
    //         cb: (error: Error | null, destination: string) => void,
    //     ): Promise<void> => {
    //         console.log(file);
    //         let fileType = '';
    //         if (file.mimetype === 'image/gif') {
    //             fileType = 'gif';
    //         }
    //         if (file.mimetype === 'image/png') {
    //             fileType = 'png';
    //         }
    //         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    //             fileType = 'jpg';
    //         }
    //         cb(null, 'image-' + Date.now() + '.' + fileType);
    //     },
    // });

    const upload = multer({ storage: multer.memoryStorage() }).single('image');

    upload(request, response, (err: any) => {
        if (err) next(err);
        next();
    });
};
