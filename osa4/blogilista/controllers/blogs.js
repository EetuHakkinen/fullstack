const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(b => b.toJSON()))
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(() => {
            response.status(400).end();
        })
});

blogsRouter.delete('/:id', (request, response) => {
    var id = request.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => {
            response.status(200).end();
        })
        .catch(e => {
            response.status(500).json(e);
        });
});

blogsRouter.post('/:id', (req, res) => {
    var id = req.params.id;
    const body = req.body;

    if (!body.likes) {
        return res.status(400).json({ error: 'content missing'});
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