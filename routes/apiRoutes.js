const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function(app) {
  // Get route for getting users lists
  // app.get("/api/user", function(req, res) {
  //   jwt.verify(
  //     req.headers["x-access-token"],
  //     req.app.get("secretKey"),
  //     function(err, decoded) {
  //       if (err) {
  //         res.json({
  //           status: "error",
  //           message: err.message,
  //           data: null
  //         });
  //       } else {
  //         // add user id to request
  //         req.body.userId = decoded.id;
  //         res.json({
  //           userid: req.body.userId
  //         });
  //         db.Users.findOne({
  //           _id: decoded.id
  //         })
  //           .then(function(dbresult) {
  //             res.json(dbresult);
  //           })
  //           .catch(function(err) {
  //             res.json(err);
  //           });
  //       }
  //     }
  //   );
  // });
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
      { username: "codey@email.com" },
      { $push: { lists: { listname: "family" } } }
    ).then(function(dbresult) {
      res.json(dbresult);
    });
  });

  // Delete route for deleting a list from the main page
  app.get("/api/list/delete", function(req, res) {
    let deleteList = req.params.id;
    jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function(err, decoded) {
        if (err) {
          res.json({ status: "error", message: err.message, data: null });
        } else {
          // db.Users.findOneAndDelete({ _id: req.params.id }).then(function(
          //   dbresult
          // ) {
          //   res.json(dbresult);
          // });

          // Finds user loops through users lists and removes list with matching id then sets users list in DB to updated list
          db.Users.findOne({
            _id: decoded.id
          })
            .then(function(dbresult) {
              let lists = dbresult.lists;
              for (let i = 0; i < lists.length; i++) {
                if (lists[i]._id === deleteList) {
                  lists.splice(i);
                  db.Users.findOneAndUpdate(
                    { _id: decoded.id },
                    { $set: { lists: lists } }
                  )
                    .then(function(result) {
                      res.json(result);
                    })
                    .catch(function(err) {
                      res.json(err);
                    });
                }
              }
            })
            .catch(function(err) {
              res.json(err);
            });
        }
      }
    );

    db.Users.findOne({
      _id: "5cbf8509ab75d630e955e2ba"
    })
      .then(function(dbresult) {
        let lists = dbresult.lists;
        for (let i = 0; i < lists.length; i++) {
          if (lists[i]._id == "5cbf85db7f31773145725256") {
            lists.splice(i);
            db.Users.findOneAndUpdate(
              { _id: "5cbf8509ab75d630e955e2ba" },
              { $set: { lists: lists } }
            )
              .then(function(result) {
                res.json(result);
              })
              .catch(function(err) {
                res.json(err);
              });
          }
        }
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
