const mongoose = require("mongoose")
const { Schema } = mongoose
const Guest = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		match: [/.+@.+\..+/, "Must match an email address!"],
	},
	rsvp: {
		type: String,
	},
	menu: {
		type: String,
	},
	wedding_owner: {
		type: String,
	},
})

const Guests = mongoose.model("Guests", Guest)

module.exports = Guests
