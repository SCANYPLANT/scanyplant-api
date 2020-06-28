declare global {
    namespace Express {
        interface Request {
            file: Multer.File;
            files:
                | {
                [fieldName: string]: Multer.File[];
            }
                | Multer.File[];
        }
    }
}
