const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeAll(() => {
    User.deleteMany({});
});

describe('adding user', async () => {

    test('check that new user exists', async () => {
        var res = await api.get('/api/users/').expect(200);
        expect(res.body[0].username).toEqual('eetuh');
    });

    test('user must have username and password', async () => {
        const firstDb = await User.find({});
        const usr = {
            name: "Eetu"
        };

        await api.post('/api/users').send(usr).expect(500);
        const db = await User.find({});
        expect(db.length).toBe(firstDb.length);
    });

    test('username must be at least 3 char', async () => {
        const firstDb = await User.find({});
        const usr = {
            username: "ee",
            name: "Eetu",
            password: "helloworld"
        };

        await api.post('/api/users').send(usr).expect(500);
        const db = await User.find({});
        expect(db.length).toBe(firstDb.length);
    });

    test('password must be at least 3 char', async () => {
        const firstDb = await User.find({});
        const usr = {
            username: "eetuh",
            name: "Eetu",
            password: "he"
        };

        await api.post('/api/users').send(usr).expect(500);
        const db = await User.find({});
        expect(db.length).toBe(firstDb.length);
    });

    test('add same user post', async () => {
        const firstDb = await User.find({});
        const usr = {
            username: "eetuh",
            name: "Eeetu",
            password: "helloworld"
        };

        const res = await api.post('/api/users').send(usr).expect(500);
        const db = await User.find({});
        expect(db.length).toBe(firstDb.length);
    });
});

describe('Login', () => {
    beforeAll(async () => {
        const usr = {
            username: "eetuh",
            name: "Eetu",
            password: "helloworld"
        };
        await usr.save();
    });

    test('logging in', async () => {
        const usr = {
            username: "eetuh",
            name: "Eetu",
            password: "helloworld"
        };
        await api.post('/api/login')
            .send(usr)
            .expect(200);
    });
});

afterAll(() => {
    mongoose.connection.close();
});