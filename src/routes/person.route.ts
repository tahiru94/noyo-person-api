import {
    Request,
    Response,
    Application
} from 'express';

class Routes {
    public routes(app: Application) {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({ message: 'Base [GET] request successful' });
            });
        app.route('/person')
            .get((req: Request, res: Response) => {
                res.status(200).send({ message: 'Base [GET] request for Person successful' });
            });
    }
}

export default Routes;