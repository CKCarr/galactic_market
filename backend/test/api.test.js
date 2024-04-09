// test/api.test.js
import { expect } from 'chai';
import supertest from 'supertest';
import { app as test_server } from '../server.js';

describe('API Tests', () => {
    it('should return 200 OK', async () => {
        const response = await supertest(test_server).get('/');
        expect(response.statusCode).to.equal(200); // Corrected to Chai's syntax
    });
});
