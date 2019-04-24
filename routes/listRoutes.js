const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function (app) {

    app.get("/api/lists", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOne({ _id: decoded.id }).then(function (dbresult) {
                        res.json(dbresult.lists);
                    });
                }
            }
        );
    });

    // Post route for creating a new list
    app.post("/api/lists", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id },
                        { $push: { lists: { listname: req.body.listname } } }
                    ).then(function (dbresult) {
                        res.json(dbresult);
                    });
                }
            }
        );
    });

    // Delete route for deleting a list from the main page
    app.delete("/api/lists/:id", function (req, res) {
        let deleteList = req.params.id;
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id },
                        { $pull: { lists: { _id: req.params.id } } }
                    ).then(function (dbresult) {
                        res.json(dbresult);
                    });
                }
            }
        );
    });

    // Get route for getting data for specific list
    app.get("/api/lists/:id", function (req, res) {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            } else {
                db.Users.findById(decoded.id).then(function (dbres) {
                    doc = dbres.lists.id(req.params.id);
                    res.json(doc);
                });
            }
        });
    });
};