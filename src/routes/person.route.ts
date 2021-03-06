import {
    Request,
    Response,
    Application
} from 'express';

import PersonController from '../controllers/person.controller';

class Routes {
    public personController: PersonController = new PersonController();

    public routes(app: Application) {
        app.route('/v1/person/all')
            .get(this.personController.getAllPeople);
        app.route('/v1/person')
            .get(this.personController.getPeople)
            .post(this.personController.addNewPerson);
        app.route('/v1/person/:id')
            .get(this.personController.getPersonById)
            .put(this.personController.updateAndVersionPerson)
            .delete(this.personController.deletePersonById);
        app.route('/v1/person/:id/version/:version')
            .get(this.personController.getPersonByIdAndVersion);
    }
}

export default Routes;