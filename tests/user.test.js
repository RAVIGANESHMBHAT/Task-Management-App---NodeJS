const request = require('supertest')

const app = require('../src/app')
const User = require("../src/models/User")
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

// afterEach(() => {
//     console.log("After each")
// })

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "Ravi",
        email: "ravi@gmail.com",
        password: "Raviganesh@123"
    }).expect(201)

    //Assert that database was changes correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about response body
    expect(response.body).toMatchObject({
        user: {
            name: "Ravi",
            email: "ravi@gmail.com"
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe("Raviganesh@123")
})

test('Should login exixting user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'non-existinguser@test.com',
        password: 'NonExistngUserPassword@123'
    }).expect(401)
})

test('Should get profile for authenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/sap labs.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Test User 1 Updated'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Test User 1 Updated')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Bangalore'
        })
        .expect(400)
})