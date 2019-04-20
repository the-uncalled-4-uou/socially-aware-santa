const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = function(app) {

    app.get("/api/users", function (req, res) {
        console.log("got here");
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            } else {

                // add user id to request
                req.body.userId = decoded.id;
                res.json({ userid: req.body.userId })
            }
        });
    });

    app.post("/api/lists", function (req, res) {
        db.Users.create(req.body)
        .then(function(dbuser) {
            res.json(dbuser);

        })
        .catch(function(err) {
            res.json(err)
        })

    })


}