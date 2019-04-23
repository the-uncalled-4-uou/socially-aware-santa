const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function(app) {
  // Get route for getting users lists
  app.get("/api/user", function(req, res) {
    jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function(err, decoded) {
        if (err) {
          res.json({
            status: "error",
            message: err.message,
            data: null
          });
        } else {
          // add user id to request
          req.body.userId = decoded.id;
          res.json({
            userid: req.body.userId
          });
          db.Users.findOne({
            _id: decoded.id
          })
            .then(function(dbresult) {
              res.json(dbresult);
            })
            .catch(function(err) {
              res.json(err);
            });
        }
      }
    );
  });
  // Post route for creating a new list
  app.get("/api/lists", function(req, res) {
    // jwt.verify(
    //   req.headers["x-access-token"],
    //   req.app.get("secretKey"),
    //   function(err, decoded) {
    //     if (err) {
    //       res.json({ status: "error", message: err.message, data: null });
    //     } else {
    //       db.Users.findOneAndUpdate(
    //         { _id: decoded.id },
    //         { $push: { lists: { listname: req.body.listname } } }
    //       ).then(function(dbresult) {
    //         res.json(dbresult);
    //       });
    //     }
    //   }
    // );
    db.Users.findOneAndUpdate(
      { username: "troy@email.com" },
      { $push: { lists: { listname: "friends" } } }
    ).then(function(dbresult) {
      res.json(dbresult);
    });
  });

  // Delete route for deleting a list from the main page
  app.get("/api/list/delete", function(req, res) {
    // let deleteList = req.params.id;
    // jwt.verify(
    //   req.headers["x-access-token"],
    //   req.app.get("secretKey"),
    //   function(err, decoded) {
    //     if (err) {
    //       res.json({ status: "error", message: err.message, data: null });
    //     } else {
    //       db.Users.findOneAndDelete({ _id: req.params.id }).then(function(
    //         dbresult
    //       ) {
    //         res.json(dbresult);
    //       });
    //     }
    //   }
    // );
    db.Users.find({
      // username: "troy@email.com"
    })
      .then(function(dbresult) {
        res.json(dbresult);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
