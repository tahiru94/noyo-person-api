import { model } from 'mongoose';
import { Request, Response } from 'express';

import PersonSchema from '../models/person.model';

const Person = model('Person', PersonSchema);

class PersonController {
    public addNewPerson(req: Request, res: Response) {
        let newPerson = new Person(req.body);

        newPerson.save((err, person) => {
            if (err) {
                res.send(err);
            }

            res.status(200).json(person);
        });
    }

    public getPeople(req: Request, res: Response) {
        Person.find({}, (err, person) => {
            if (err) {
                res.send(err);
            }

            res.json(person);
        });
    }

    public getPersonById(req: Request, res: Response) {
        const { id } = req.params; // Must be sent as /id and not ?id=
        Person.findOne({ id }, (err: any, person: typeof Person) => {
            if (err) {
                res.send(err);
            }

            res.send(person);
        });
    }
}

export default PersonController;