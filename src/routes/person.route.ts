import {
    Request,
    Response,
    Application
} from 'express';

import PersonController from '../controllers/person.controller';

class Routes {
    public personController: PersonController = new PersonController();

    public routes(app: Application) {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({ message: 'Base [GET] request successful' });
            });
        app.route('/v1/person')
            .get(this.personController.getPeople)
            .post(this.personController.addNewPerson);
        app.route('/v1/person/:id')
            .get(this.personController.getPersonById);
    }
}

export default Routes;