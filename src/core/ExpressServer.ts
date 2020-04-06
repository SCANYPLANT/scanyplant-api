import express, { Application, Request, Response } from 'express';
import path from 'path';
import { Server } from 'http';
import chalk from 'chalk';
import 'reflect-metadata';
import { Middlewares } from './middlewares';
import { createConnection } from 'typeorm';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import api from '../../src/routes';

class ExpressServer {
    // server | api instance
    private app: Application = express();
    private server: Server = new Server(this.app);

    public run(): void {
        const { PORT: port } = process.env;
        createConnection('default')
            .then(async () => {
                // define default root
                this.app.get('/', (req: Request, res: Response) => {
                    res.json({
                        root:
                            'Welcome on your app root endpoint ! Try to get /api now :) for look ',
                        doc: 'go to /docs for documentation ',
                    });
                });
                Middlewares(this.app);
                // Swagger set up
                const options = {
                    swaggerDefinition: {
                        openapi: '3.0.0',
                        info: {
                            title: 'ScannyPlant APi - Documentation',
                            description: 'Fetch data medicen wordpress',
                            version: '1.0.0',
                        },
                        servers: [
                            {
                                url: `http://localhost:${port}/api/`,
                            },
                        ],
                    },
                    apis: [path.resolve(__dirname, '../controllers/*.ts')],
                };
                const specs = swaggerJsdoc(options);
                this.app.use('/docs', swaggerUi.serve);
                this.app.get(
                    '/docs',
                    swaggerUi.setup(specs, {
                        explorer: true,
                    }),
                );
                // use routes
                this.app.use('/api', api);
                // open server
                this.server.listen(port, () => {
                    console.log(
                        chalk.bold.magenta(
                            `💫  Server is running on http://localhost:${port}`,
                        ),
                    );
                });
            })
            .catch(error => console.log(error));
    }
}

export default Object.freeze(new ExpressServer());
