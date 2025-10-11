const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true, "Title is required"],
        lowercase: true,
        unique: true,
        trim: true,
        maxlength: 200
    },
    author: String,
    price: {
        type:Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"] 

    },
    rating: {
        type:Number,
        default: 0
    }
})

module.exports = mongoose.model("Book", bookSchema)