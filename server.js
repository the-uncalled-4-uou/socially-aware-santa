const express = require("express");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/socially-aware-santa", { useNewUrlParser: true });
