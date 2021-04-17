import {
    groupBy,
    values,
    flattenDeep,
    compact
} from 'lodash';

import IPerson from '../src/models/person.interface';

const getLatestForAll = (person: IPerson[] | any): Array<IPerson> => {
    if (person && person.length) {
        const groupedById = values(groupBy(person, 'id'));
        const updatedGroupedById = groupedById.map((group) => {
            const latest = group.sort((personA: any, personB: any) => {
                return personB.version - personA.version;
            })[0];
            return latest;
        });
        return compact(flattenDeep(updatedGroupedById));
    }

    return [];
}

const getLatestPerson = (person: IPerson[] | any): IPerson => {
    const latest: IPerson = (person).sort((personA: any, personB: any) => {
        return personB.version - personA.version;
    })[0];

    return latest;
}

export default {
    getLatestForAll,
    getLatestPerson
};