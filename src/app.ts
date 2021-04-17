import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose, { Connection } from 'mongoose';

import Routes from './routes/person.route';
import * as config from '../config';

class App {
    public app: Application;
    public apiRoutes: Routes = new Routes();
    public mongoUrl: string = config.default.mongoUrl;
    public connection!: Promise<any>;

    constructor() {
        this.app = express();
        this.config();
        this.apiRoutes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        this.connection = mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    private async mongoTeardown(): Promise<void> {
        (await (this.connection as Promise<Connection>)).close();
    }
}

export default new App().app;