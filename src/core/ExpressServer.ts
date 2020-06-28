import express, { Application, Request, Response } from 'express';
import { Server } from 'http';
import chalk from 'chalk';
import 'reflect-metadata';
import { serverOptions } from './serverOptions';
import { createConnection } from 'typeorm';

import api from '../../src/routes';

//import graphqlServer from './GraphQLServer';

class ExpressServer {
    // server | api instance
    private app: Application = express();
    private server: Server = new Server(this.app);

    public run(): void {
        const { PORT: port, APP_ENV: APP_ENV } = process.env;
        createConnection(`${APP_ENV ? APP_ENV : 'default'}`)
            .then(async () => {
                this.app.get('/', (req: Request, res: Response) => {
                    res.json({
                        root:
                            'Welcome on your app root endpoint ! Try to get /api now :) for look ',
                        documentation: 'go to /api/docs for documentation ',
                    });
                });
                serverOptions(this.app);
                this.app.use('/api', api);

                this.server.listen(port, () => {
                    console.log(
                        chalk.bold.magenta(
                            `💫  Server is running on http://localhost:${port}`,
                        ),
                    );
                });
            })
            .catch(error => {
                console.log(error.message);
                return error;
            });
    }
}

export default Object.freeze(new ExpressServer());
