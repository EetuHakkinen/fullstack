const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    const passwOK = user === null ? false : await bcrypt.compare(req.body.password, user.password);

    if (!(user && passwOK)) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userToken, process.env.SECRET);

    res
        .status(200)
        .send({ token, username: user.username, name: user.name});
});

module.exports = loginRouter;