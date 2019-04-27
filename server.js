// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");

//Initialize Express
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Configuration
app.set("secretKey", "nodeRestApi");

// Connect to Mongodb
let mongo_uri = process.env.MONGODB_URI || "mongodb://localhost/socially-aware-santa";
mongoose.connect(mongo_uri, {
  useNewUrlParser: true
});

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/listRoutes")(app);
require("./routes/nameRoutes")(app);
require("./routes/ruleRoutes")(app);

app.use(express.static("dist"));

// Start Server
let port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port: " + port));