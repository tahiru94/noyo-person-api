import app from '../app';
import request from 'supertest';

import person from './__mocks__/person';

describe('/v1/person/all', () => {
    it('GET request', async () => {
        const result = await request(app).get('/v1/person/all');
        expect(result.type).toEqual('application/json');
        expect(result.status).toEqual(200);
    });
});

describe('/v1/person', () => {
    it('GET request', async () => {
        const result = await request(app).get('/v1/person');
        expect(result.type).toEqual('application/json');
        expect(result.status).toEqual(200);
    });

    it('POST request', async () => {
        const result = await request(app)
            .post('/v1/person')
            .send(person)
            .set('Accept', 'application/json');
        expect(result.type).toEqual('application/json');
        expect(result.status).toEqual(200);
    });
});

describe('/v1/person/:id', () => {
    it('GET /v1/person/:id', async () => {
        const result = await request(app)
            .get('/v1/person' + '/sample-id');
        expect(result.type).toEqual('application/json');
        expect(result.status).toEqual(200);
        expect(result.text).toEqual(''); // Blank person response since uuid v4 is used for id
    });
})