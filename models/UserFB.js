var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: String,
    email: String,
    name: String
});

var Person = mongoose.model('Person', userSchema, "Person");
module.exports = Person;