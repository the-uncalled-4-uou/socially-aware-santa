const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    app.post("/api/register", function (req, res) {
        db.Users.findOne({ username: req.body.username })
        .then(function (dbres) {
            if (dbres) {
                res.json({ "message": "User Already Exists" });
            } else {
                db.Users.create(req.body)
                .then(function (dbExample) {
                    res.json(dbExample);
                })
                .catch(function (err) {
                    console.log(err);
                });
            }
        })
        .catch(function (err) {
            console.log(err);
        });
    });

    app.post("/api/authenticate", function (req, res) {
        db.Users.findOne({ username: req.body.username }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {

                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });

                    res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });

                } else {

                    res.json({ status: "error", message: "Invalid email/password!!!", data: null });

                }
            }
        });
    });

};