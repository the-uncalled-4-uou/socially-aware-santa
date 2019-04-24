const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function (app) {

    app.get("/api/lists/:listid/names", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findById(decoded.id).then(function (dbres) {
                        doc = dbres.lists.id(req.params.listid).names;
                        res.json(doc);
                    });
                }
            }
        );
    });

    // Post route for creating a new list
    app.post("/api/lists/:listid/names", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id, "lists._id": req.params.listid},
                        { $push: { "lists.$.names": { "personname": req.body.personname } }}
                    ).then(function (dbresult) {
                        res.json(dbresult);
                    });
                }
            }
        );
    });

    // Delete route for deleting a list from the main page
    app.delete("/api/lists/:listid/names/:nameid", function (req, res) {
        let deleteList = req.params.id;
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOneAndUpdate(
                        { _id: decoded.id, "lists._id": req.params.listid },
                        { $pull: { "lists.$.names": { _id: req.params.nameid } } }
                    ).then(function (dbresult) {
                        res.json(dbresult);
                    });
                }
            }
        );
    });
};