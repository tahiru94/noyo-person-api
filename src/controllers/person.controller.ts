import { model } from 'mongoose';
import { Request, Response } from 'express';

import PersonSchema from '../models/person.model';
import * as utils from '../../utils/utils';

const Person = model('Person', PersonSchema);

class PersonController {
    /**
     * GET /v1/person
     * @param req request object
     * @param res response object
     */
    public getPeople(req: Request, res: Response) {
        Person.find({}, (err, person) => {
            if (err) {
                res.send(err);
            }

            const latestForAll = utils.default.getLatestForAll(person);
            res.json(latestForAll);
        });
    }

    /**
     * GET /v1/person/:id
     * @param req request object (id for person)
     * @param res response object
     */
    public getPersonById(req: Request, res: Response) {
        const { id } = req.params; // Must be sent as /id and not ?id=
        Person.find({ id }, (err: any, person: typeof Person) => {
            if (err) {
                res.send(err);
            }

            const latest = utils.default.getLatestPerson(person);
            res.json(latest);
        });
    }

    /**
     * GET /v1/person/:id/version/:version
     * @param req request object (id and version for person)
     * @param res response object
     */
    public getPersonByIdAndVersion(req: Request, res: Response) {
        const { id, version } = req.params;

        Person.findOne({ id, version }, (err: any, person: typeof Person) => {
            if (err) {
                res.send(err);
            }

            res.json(person);
        });
    }

    /**
     * POST /v1/person
     * @param req request object (body with person fields)
     * @param res response object
     */

    public addNewPerson(req: Request, res: Response) {
        let newPerson = new Person(req.body);

        newPerson.save((err, person) => {
            if (err) {
                res.send(err);
            }

            res.json(person);
        });
    }

    /**
     * PUT /v1/person/:id
     * @param req request object (body with updated fields)
     * @param res response object
     */
    public updateAndVersionPerson(req: Request, res: Response) {
        const { id } = req.params;
        let newPerson = new Person(req.body); // Default, updated below

        Person.find({ id }, (err: any, person: typeof Person) => {
            if (err) {
                res.send(err);
            }

            if (person) {
                const latest = utils.default.getLatestPerson(person);

                newPerson = new Person({
                    ...latest,
                    ...req.body,
                    version: new Date(),
                    id
                });
            }

            newPerson.save((err, person) => {
                if (err) {
                    res.send(err);
                }

                res.json(person);
            });
        });
    }

    public deletePersonById(req: Request, res: Response) {
        const { id } = req.params;

        Person.find({ id }, (err: any, person: typeof Person) => {
            if (err) {
                res.send(err);
            }

            if (person) {
                console.log('person is', person);
                const latest = utils.default.getLatestPerson(person);
                console.log('latest is', latest);

                Person.deleteOne({ _id: latest._id }).then(_ => {
                    // noop, just here to confirm delete
                    // TODO: Investigate why `then` needs to be used
                });

                res.json({ message: `Deleted Person with id ${id} [version: ${latest.version}]` })
            }
        });
    }
}

export default PersonController;