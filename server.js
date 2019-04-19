// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const authroutes = require('./routes/authRoutes');
const apiroutes = require('./routes/apiRoutes');
const db = require('./models')

//Initialize Express
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Session Configuration
app.set('secretKey', 'nodeRestApi')



// Connect to Mongodb
mongoose.connect("mongodb://localhost/socially-aware-santa", { useNewUrlParser: true });


require('./routes/authRoutes')(app)
require('./routes/apiRoutes')(app)


app.use(express.static("public"));

// Start Server
let port = process.env.port || 3000;
app.listen(port, "localhost", () => console.log("Up and Running"));