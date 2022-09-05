const supertest = require('supertest')
const app = require('../../api/api')
const mongoose = require('mongoose');
require('dotenv').config()

describe('User controllers', () => {
    let api;

    beforeAll(async () => {
        await mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            })
            .then(() => {
                api = app.listen(5050)
            })
    });

    afterAll((done) => {
        console.log('Gracefully stopping the server');
        api.close(done);
    })

    it('it retrieves users from database', () => {
        supertest(api).get('/users').expect((res) => {
            expect(res.status).toBe(200)
        })
    })

    it('it increments score', async () => {
        const response = await supertest(api).post('/nasim/score')
            .send({
                "score": 100
            })
            .set('Accept', 'application/json');

        expect(response.body.user).toBeDefined();
        expect(response.body.message).toBe("Score updated");
        expect(response.statusCode).toEqual(200)
    })
    
    it('Does not increment score when sent 0', async () => {
        const response = await supertest(api).post('/nasim/score')
            .send({
                "score": 0
            })
            .set('Accept', 'application/json');

        expect(response.body.message).toBe("Score is 0 - Do better next time");
        expect(response.statusCode).toEqual(200)
    })

    it('Cant find a score for an invalid user', async () => {
        const response = await supertest(api).post('/ndakjnbfqani/score')
            .send({
                "score": 10
            })
            .set('Accept', 'application/json');
            
        expect(response.statusCode).toEqual(500)
    })
})



