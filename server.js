// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Initialize Express
var app = express();

// Session Configuration
app.use(
    expressSession({
        resave: false,
        saveUninitialized: true,
        secret:
            process.env.SESSION_SEC || "You must generate a random session secret"
    }))

// Connect to Mongodb
mongoose.Promise = require("bluebird");
app.use((req, res, next) => {
    if (mongoose.connection.readyState) next();
    else {
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/socially-aware-santa";
        mongoose
        .connect(mongoUrl, { useMongoClient: true })
        .then(() => next())
        .catch(err => console.error(`Mongoose Error: ${ err.stack }`));
    }
});

// Passport

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (userId, done) {
    User.findById(userId, (err, user) => done(err, user));
});

// Passport Local
const local = new LocalStrategy((username, password, done) => {
    User.findOne({ username })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            done(null, false, { message: "Invalid username/password" });
        } else {
            done(null, user);
        }
    })
    .catch(e => done(e));
});
passport.use("local", local);

// Routes
//app.use("/", require("./routes")(passport));

app.use(express.static("public"));

// Start Server
app.listen(3000, "localhost", () => console.log("Up and Running"));