const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, res, next) => {
    try {
        var isNotUnique = false;
        var users = await User.find({});
        for(var u in users) {
            if (users[u].username === req.body.username) {
                isNotUnique = true;
            }
        }
        if (req.body.password.length > 3 && req.body.username.length > 3 && !isNotUnique) {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password
            });
            const susr = await user.save();
            res.json(susr);
        } else {
            res.status(500).end();
        }

    } catch (e) {
        next(e);
    }
});

usersRouter.get('/', async (req, res) => {
    var data = await User.find({}).populate('blogs')
    res.json(data.map(u => u.toJSON()));
});

module.exports = usersRouter;