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
                        doc = dbres.lists.id(req.params.listid).names.id(req.params.nameid).givrules;
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
                    db.Users.findOne({ _id: decoded.id }).then(dbres => {
                        for (let i = 0; i < dbres.lists.length; i++) {
                            if (req.params.listid === String(dbres.lists[i]._id)) {
                                listindex = i;
                            }
                        }
                        for (let i = 0; i < dbres.lists[listindex].names.length; i++) {
                            if (req.params.nameid === String(dbres.lists[listindex].names[i]._id)) {
                                nameindex = i;
                            }
                        }
                        pushstring = "lists." + listindex + ".names." + nameindex + ".giverules";
                        query = {};
                        query[pushstring] = { "nameid": req.body.nameid };
                        db.Users.findOneAndUpdate(
                            { _id: decoded.id },
                            { $push: query }, { multi: true, new: true }
                        ).then(function (dbresult) {
                            result = dbresult.lists.id(req.params.listid).names.id(req.params.nameid).giverules.pop();
                            res.json(result);
                        });
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
                    db.Users.findOne({ _id: decoded.id }).then(dbres => {
                        for (let i = 0; i < dbres.lists.length; i++) {
                            if (req.params.listid === String(dbres.lists[i]._id)) {
                                listindex = i;
                            }
                        }
                        for (let i = 0; i < dbres.lists[listindex].names.length; i++) {
                            if (req.params.nameid === String(dbres.lists[listindex].names[i]._id)) {
                                nameindex = i;
                            }
                        }
                        for (let i = 0; i < dbres.lists[listindex].names[nameindex].giverules.length; i++) {
                            if (req.params.giveruleid === String(dbres.lists[listindex].names[nameindex].giverules[i]._id)) {
                                giveruleindex = i;
                            }

                        }
                        deletedrecord = dbres.lists[listindex].names[nameindex].giverules[giveruleindex]
                        pushstring = "lists." + listindex + ".names." + nameindex + ".giverules";
                        query = {};
                        query[pushstring] = { _id: req.params.giveruleid };
                        db.Users.findOneAndUpdate(
                            { _id: decoded.id},
                            { $pull: query }, { multi: true, new: true }
                        ).then(function (dbresult) {
                            res.json(deletedrecord);
                        });
                    })
                }
            }
        );
    });

    app.get("/api/lists/:listid/names/:nameid/receiverules", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findById(decoded.id).then(function (dbres) {
                        doc = dbres.lists.id(req.params.listid).names.id(req.params.nameid).receiverules;
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
                    db.Users.findOne({ _id: decoded.id }).then(dbres => {
                        for (let i = 0; i < dbres.lists.length; i++) {
                            if (req.params.listid === String(dbres.lists[i]._id)) {
                                listindex = i;
                            }
                        }
                        for (let i = 0; i < dbres.lists[listindex].names.length; i++) {
                            if (req.params.nameid === String(dbres.lists[listindex].names[i]._id)) {
                                nameindex = i;
                            }
                        }
                        pushstring = "lists." + listindex + ".names." + nameindex + ".receiverules";
                        query = {};
                        query[pushstring] = { "nameid": req.body.nameid };
                        db.Users.findOneAndUpdate(
                            { _id: decoded.id },
                            { $push: query}, { multi: true, new: true}
                        ).then(function (dbresult) {
                            result = dbresult.lists.id(req.params.listid).names.id(req.params.nameid).receiverules.pop();
                            res.json(result);
                        });
                    });
                }
            }
        );
    });

    // Delete route for deleting a list from the main page
    app.delete("/api/lists/:listid/names/:nameid/receiverules/:receiveruleid", function (req, res) {
        jwt.verify(
            req.headers["x-access-token"],
            req.app.get("secretKey"),
            function (err, decoded) {
                if (err) {
                    res.json({ status: "error", message: err.message, data: null });
                } else {
                    db.Users.findOne({ _id: decoded.id }).then(dbres => {
                        for (let i = 0; i < dbres.lists.length; i++) {
                            if (req.params.listid === String(dbres.lists[i]._id)) {
                                listindex = i;
                            }
                        }
                        for (let i = 0; i < dbres.lists[listindex].names.length; i++) {
                            if (req.params.nameid === String(dbres.lists[listindex].names[i]._id)) {
                                nameindex = i;
                            }
                        }
                        for (let i = 0; i < dbres.lists[listindex].names[nameindex].receiverules.length; i++) {
                            if (req.params.receiveruleid === String(dbres.lists[listindex].names[nameindex].receiverules[i]._id)) {
                                recieveruleindex = i;
                            }

                        }
                        deletedrecord = dbres.lists[listindex].names[nameindex].receiverules[recieveruleindex]
                        pushstring = "lists." + listindex + ".names." + nameindex + ".receiverules";
                        query = {};
                        query[pushstring] = { _id: req.params.receiveruleid };
                        db.Users.findOneAndUpdate(
                            { _id: decoded.id},
                            { $pull: query }, { multi: true, new: true }
                        ).then(function (dbresult) {
                            res.json(deletedrecord);
                        });
                    })
                }
            }
        );
    });

};