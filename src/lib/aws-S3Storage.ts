// MULTER
import multer, { FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
// AWS
import aws from 'aws-sdk';
// INTERNALS
// @ts-ignore
import IStorageService from './IStorageService';

aws.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    region: process.env.AWS_S3_REGION,
});

class S3Service implements IStorageService {
    static s3: AWS.S3 = new aws.S3();
    private static multerS3Options = {
        acl: 'public-read',
        s3: S3Service.s3,
        bucket: String(process.env.AWS_S3_BUCKET),
        metadata: function (
            req: Express.Request,
            file: Express.Multer.File,
            cb: (error: any, metadata?: any) => void,
        ): void {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key: function (
            req: Express.Request,
            file: Express.Multer.File,
            cb: (error: any, key?: string) => void,
        ): void {
            cb(null, Date.now().toString());
        },
    };

    uploadImg: any = multer(S3Service.options);

    private static fileFilter: (
        req: any,
        file: Express.Multer.File,
        cb: FileFilterCallback,
    ) => void = (
        req: any,
        file: Express.Multer.File,
        cb: FileFilterCallback,
    ) => {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPEG and PNG is allowed!'));
        }
    };

    private static options: multer.Options = {
        fileFilter: S3Service.fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5, // Only 5 MB files are allowed
        },
        storage: multerS3(S3Service.multerS3Options),
    };

    deleteImg: (key: string) => Promise<void> = async imgKey => {
        S3Service.s3.deleteObject(
            {
                Bucket: String(process.env.AWS_S3_BUCKET),
                Key: imgKey,
            },
            function (err) {
                if (err) console.log(err.message);
            },
        );
    };

    extractFileKeyFromUrl = (plainUrl?: string): string | null =>
        plainUrl != null || plainUrl != undefined
            ? plainUrl.replace(String(process.env.AWS_S3_URL), '')
            : null;
}

export default Object.freeze(new S3Service());
