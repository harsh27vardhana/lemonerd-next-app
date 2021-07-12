const mongoose = require("mongoose");

const QuicksplainedSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.models.Quicksplained || mongoose.model("Quicksplained", QuicksplainedSchema);
