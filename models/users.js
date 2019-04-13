const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 12);
});

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;