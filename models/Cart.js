const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
	cartId: {
		type: String,
		required: true
	},
	
	date : {
		type: Date ,
		default: Date.now
	}
	
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart ;
