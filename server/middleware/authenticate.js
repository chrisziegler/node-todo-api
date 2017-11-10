const {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        //middleware - always call next if you want code below it to run
        next();
    }).catch((e) => {
        res.status(401).send();
        //here we don't run next because we don't want to run routes
        //if authentification failed for some reason
    });
}

module.exports = { authenticate };
