const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getToken = req => {
    const auth = req.get('authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7);
    }
    return;
}

blogsRouter.get('/', (request, response) => {
    Blog
        .find({}).populate('user', { name: 1 })
        .then(blogs => {
            response.json(blogs.map(b => b.toJSON()))
        })
})

blogsRouter.post('/', async (request, response, next) => {
    const token = getToken(request);

    try {
        const decToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decToken.id) {
            return response.status(401).end();
        }

        const user = await User.findById(decToken.id);

        const blog = new Blog({
            ...request.body,
            user: user._id
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(blog);
        await user.save();
        response.json(savedBlog);
    } catch (e) {
        next(e)
    }
});

blogsRouter.delete('/:id', async (request, response) => {
    var id = request.params.id;
    const token = getToken(request);

    try {
        const decToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decToken.id) {
            return response.status(401).end();
        }

        const user = await User.findById(decToken.id);
        const blog = await Blog.findById(id);

        if (user._id.toString() === blog.user.toString()) {
            Blog.findByIdAndDelete(id)
                .then(() => {
                    response.status(200).end();
                })
                .catch(e => {
                    response.status(500).json(e);
                });
        }
    } catch (e) {
        next(e)
    }
});

blogsRouter.post('/:id', (req, res) => {
    var id = req.params.id;
    const body = req.body;

    if (!body.likes) {
        return res.status(400).json({ error: 'content missing' });
    }

    console.log(body);

    const b = new Blog({
        _id: id,
        ...body
    });

    b.save().then(s => {
        res.status(200).json(s.toJSON());
    })
        .catch(e => {
            res.status(500).json(e);
        })

});

module.exports = blogsRouter;