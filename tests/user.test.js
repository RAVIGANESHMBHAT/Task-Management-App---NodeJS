const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: "Ravi",
        email: "ravi@gmail.com",
        password: "Raviganesh@123"
    }).expect(201)
})