const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const GiveSchema = new Schema({
    nameid: {
        type: String,
        trim: true
    }
})

const RecieveSchema = new Schema({
    nameid: {
        type: String,
        trim: true
    }
})

const NameSchema = new Schema({
    personname: {
        type: String,
        trim: true
    },
    giverules: [GiveSchema],
    receiverules: [RecieveSchema],

})

const ListsSchema = new Schema({
    listname: {
        type: String,
        trim: true
    },
    names: [NameSchema]
})

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    lists: [ListsSchema]
});

UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Users', UserSchema);