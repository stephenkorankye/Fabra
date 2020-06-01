const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}, 
	region: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	housenumber: {
		type: String,
		required: true
	},
	img : {
		data: Buffer ,
		contentType: String
	} ,
	userType: {
		type: String,
		required: true
	}
	
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
