const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    discription: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.models.Author || mongoose.model("Author", AuthorSchema);
