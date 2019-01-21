var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	firstname: String,
	lastname: String,
	email: String,
	password: String
},{collection: 'Usuarios'});

var User = mongoose.model('User', UserSchema);

module.exports =  User;