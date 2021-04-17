import { model } from 'mongoose';
import { Request, Response } from 'express';
import {
    groupBy,
    values,
    flattenDeep,
    compact
} from 'lodash';

import PersonSchema from '../models/person.model';

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

            if (person) {
                const groupedById = values(groupBy(person, 'id'));
                const updatedGroupedById = groupedById.map((group) => {
                    const latest = group.sort((personA: any, personB: any) => {
                        return personB.version - personA.version;
                    })[0];
                    return latest;
                });
                res.json(compact(flattenDeep(updatedGroupedById)));
            }
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

            if (person) {
                const latest = (person as any).sort((personA: any, personB: any) => {
                    return personB.version - personA.version;
                })[0];

                res.json(latest);
            }
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
                const latest = (person as any).sort((personA: any, personB: any) => {
                    return personB.version - personA.version;
                })[0];

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
}

export default PersonController;