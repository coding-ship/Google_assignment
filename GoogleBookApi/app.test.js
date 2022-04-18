const request = require('supertest');
const { response } = require('./app');
const app = require('./app');

describe("Suites of test for all the routes in our app", () => {
    it(`Finding the search query`, () => {
        return request(app)
        .get('/history')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    
                ]))
        })
    })
})
