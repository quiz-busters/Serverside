const supertest = require("supertest");
const mongoose = require('mongoose');
const app = require("../api/api");
require('dotenv').config()

describe("API", () => {
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
        api = app.listen(3030)
    })
  });

  afterAll((done) => {
    api.close(done);
    mongoose.disconnect();
  });

  describe("GET requests", () => {
    it("it reponds to a GET request at '/' with a 200 status", (done) => {
      supertest(api).get("/").expect(200, done);
    });

    it("it retrieves 200 status of GET request at '/users'", (done) => {
      supertest(api).get("/users").expect(200, done);
    });

  });
})
