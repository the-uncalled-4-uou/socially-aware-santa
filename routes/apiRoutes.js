const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function(app) {
  app.get("/api/user", function(req, res) {
    db.Users.updateOne(
      { username: "codey@email.com" },
      {
        $push: {
          lists: {
            $each: {
              name: "friends",
              people: ["john", "jane", "jim", "jean"],
              cannotMatch: [["jim", "jean"], ["john", "jane"]]
            }
          }
        }
      }
    )
      .then(function(data) {
        res.send(data);
      })
      .catch(function(err) {
        res.send(err.message);
      });
    // jwt.verify(
    //   req.headers["x-access-token"],
    //   req.app.get("secretKey"),
    //   function(err, decoded) {
    //     if (err) {
    //       res.json({ status: "error", message: err.message, data: null });
    //     } else {
    //       // add user id to request
    //       req.body.userId = decoded.id;
    //       res.json({ userid: req.body.userId });
    //     }
    //   }
    // );
    // db.Users.findOne({ username: "codeycsm@email.com" }).then(function(data) {
    //   res.send(data);
    // });
  });

  app.post("/api/lists", function(req, res) {
    db.Users.create(req.body)
      .then(function(dbuser) {
        res.json(dbuser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
