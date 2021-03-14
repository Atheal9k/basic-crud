const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
})

module.exports = mongoose.model("Event", eventSchema)
