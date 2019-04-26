const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function (app) {

    app.get("/api/lists/:listid/names/:nameid/giverules", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findById(decoded.id).then(function (dbres) {
                        doc = dbres.lists.id(req.params.listid).names.id(req.params.nameid);
                        res.json(doc);
                    });
                }
            }
        );
    });

    // Post route for creating a new list
    app.post("/api/lists/:listid/names/:nameid/giverules", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id, "lists._id": req.params.listid, "lists.0.names._id": req.params.nameid},
                        { $push: { "lists.0.names.0.giverules": { "nameid": req.body.nameid } }}, { multi: true }
                    ).then(function (dbresult) {
                        res.json(dbresult);
                    });
                }
            }
        );
    });

    // Delete route for deleting a list from the main page
    app.delete("/api/lists/:listid/names/:nameid/giverules/:giveruleid", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id, "lists._id": req.params.listid, "lists.0.names._id": req.params.nameid },
                        { $pull: { "lists.0.names.0.giverules": { _id: req.params.nameid } } }, { multi: true }
                    ).then(function (dbresult) {
                        res.json(dbresult);
                    });
                }
            }
        );
    });

    app.get("/api/lists/:listid/names/:nameid/getrules", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findById(decoded.id).then(function (dbres) {
                        doc = dbres.lists.id(req.params.listid).names.id(req.params.nameid);
                        res.json(doc);
                    });
                }
            }
        );
    });

    // Post route for creating a new list
    app.post("/api/lists/:listid/names/:nameid/receiverules", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id, "lists._id": req.params.listid, "lists.0.names._id": req.params.nameid},
                        { $push: { "lists.0.names.0.receiverules": { "nameid": req.body.nameid } }}, { multi: true, new: true }
                    ).then(function (dbresult) {
                        console.log(dbresult)
                        test = dbresult.lists.id(req.params.listid).names.id(req.params.nameid).receiverules
                        res.json(test);
                    });
                }
            }
        );
    });

    // Delete route for deleting a list from the main page
    app.delete("/api/lists/:listid/names/:nameid/getrules/:receiveruleid", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id, "lists._id": req.params.listid, "lists.0.names._id": req.params.nameid },
                        { $pull: { "lists.0.names.0.receiverules": { _id: req.params.receiveruleid } } }, { multi: true }
                    ).then(function (dbresult) {
                        res.json(dbresult);
                    });
                }
            }
        );
    });

};