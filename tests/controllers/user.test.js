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

    it('Recieves status code 200 for /leaderboard route', () => {
        supertest(api).get('/leaderboar').expect((res) => {
            expect(res.status).toBe(200)
        })
    })

    it('it increments score', async () => {
        const response = await supertest(api).post('/nasim190/score')
            .send({
                "score": 100
            })
            .set('Accept', 'application/json');

        expect(response.body.user).toBeDefined();
        expect(response.body.message).toBe("Score updated");
        expect(response.statusCode).toEqual(200)
    })

    it('Does not increment score when sent 0', async () => {
        const response = await supertest(api).post('/nasim190/score')
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

    it("it checks a sample credential is correct", async () => {
        const response = await supertest(api).post('/login')
            .send({
                "username": "jest",
                "password": "jest"
            })
            .set('Accept', 'application/json');

        expect(response.body.message).toBe('Successfully logged in')
        expect(response.body.success).toBe(true)
    })



    it("it checks to see if a register works", async () => {

        function makeid(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }

        const response = await supertest(api).post('/register')
            .send({
                "email": makeid(15),
                "username": makeid(12),
                "password": makeid(10)
            })
            .set('Accept', 'application/json');

        expect(response.body.username).toBeDefined();
        expect(response.body.message).toBeDefined();
        expect(response.statusCode).toEqual(201)
    })

})



