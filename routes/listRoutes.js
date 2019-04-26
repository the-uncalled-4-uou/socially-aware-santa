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
                    res.json({ status: "error", errors: err.message });
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
                    res.json({ status: "error", errors: err.message });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id },
                        { $push: { lists: { listname: req.body.listname } } },
                        {new: true}
                    ).then(function (dbresult) {
                        let newest = dbresult.lists[dbresult.lists.length - 1];
                        res.json(newest);
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

    app.get("/api/lists/:id/matches", function (req, res) {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            } else {
                db.Users.findById(decoded.id).then(function (dbres) {
                    doc = dbres.lists.id(req.params.id).matchedlist;
                    res.json(doc);
                });
            }
        });
    })

    app.post("/api/lists/:id/matches", function (req, res) {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            } else {
                db.Users.findOneAndUpdate(
                    { _id: decoded.id, "lists._id": req.params.id },
                    { $set: { "lists.$.matchedlist": req.body.matchedlist } }, {many: true, new: true}
                ).then(function (dbresult) {
                    console.log(req.body.matchedlist)
                    console.log(dbresult)
                    res.json(dbresult);
                }).catch(err => {
                    console.log(err)
                })
            }
        });
    })

};