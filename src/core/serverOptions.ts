import { Application } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cacheControl from 'express-cache-controller';
import cors from 'cors';
import passport from 'passport';
import path from 'path';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import aws from 'aws-sdk';

export const serverOptions = (app: Application): void => {
    app.use(
        cors({
            origin: '*', // after change to url website
            credentials: true,
        }),
    );
    app.use(helmet());
    app.use(passport.initialize());
    app.use(cacheControl({ noCache: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // Swagger set up
    const options = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Scanny Plant API  - Documentation',
                description: 'Api Scanny Plant 🙃',
                version: '1.0.0',
            },
            servers: [
                {
                    url: `${process.env.HOST}${process.env.APP_ENV === 'dev' ? ':' + process.env.PORT || 3000 : ''}/api/`,
                },
            ],
        },
        apis: [path.resolve(__dirname, '../controllers/*')],
    };
    const specs = swaggerJsdoc(options);
    app.use('/api/docs', swaggerUi.serve);
    app.get(
        '/api/docs',
        swaggerUi.setup(specs, {
            explorer: true,
        }),
    );

    // connect to AWS
    aws.config.update({
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        region: process.env.AWS_S3_REGION,
    });
};
