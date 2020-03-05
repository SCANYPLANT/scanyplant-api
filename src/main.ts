import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import route from './routes';
import cors from 'cors';
import cacheControl from 'express-cache-controller';
import * as http from 'http';
import passport from 'passport';
import helmet from 'helmet';

config(); // add dotEnv

const app: Express.Express = Express();
export let server: http.Server;
export const port = process.env.PORT || 8082;

createConnection('default')
    .then(async () => {
        app.use(bodyParser.json());
        app.use(helmet());
        app.use(cors());
        app.use(passport.initialize());
        app.use(cacheControl({ noCache: true }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(['/', '/api'], route);
        server = app.listen(port, () => {
            console.log(`server started at ${process.env.HOST}/api`);
        });
    })
    .catch(error => console.log(error));

export default app;
