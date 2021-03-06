const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        __v: 0,
        user: "fghji654erfghjuytrfvb"
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
        user: "fghji654erfghjuytrfvb"
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();

    const usr = {
        username: "eetuh",
        name: "Eetu",
        password: "helloworld",
        _id: "fghji654erfghjuytrfvb"
    };
    await usr.save();
});

test('blogs OK', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('db contains right blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(2);
});

test('identificator should be id', async () => {
    const response = await api.get('/api/blogs');
    for (var r in response.body) {
        expect(response.body[r].id).toBeDefined();
    }
});

test('length should increase by one while adding', async () => {
    var first = await Blog.find({})
    await api.post('/api/blogs').send({
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user: '5cad895bdd36c02b96e820a8',
        __v: 0
    }).expect(201).expect('Content-Type', /application\/json/);

    var second = await Blog.find({});

    expect(second.length).toBe(first.length + 1);
});

test('likes should have value', async () => {
    const body = await api.get('/api/blogs').body;
    for (var b in body) {
        expect(body[b].likes).toBeDefined();
    }
});

test('post should have title and url', async () => {
    const blogpost = { likes: 0, author: 'Eetu' }
    await api.post('/api/blogs').send(blogpost).expect(400);
});

test('remove blog', async () => {
    const first = await Blog.find({})
    await api.delete('/api/blogs/5a422a851b54a676234d17f7').expect(200);
    const second = await Blog.find({});

    if (second.length > 0) {
        expect(second.length).toBe(first.length - 1);
    }
});

afterAll(() => {
    mongoose.connection.close();
});