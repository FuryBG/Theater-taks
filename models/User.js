const { Schema, model } = require("mongoose");

const schema = new Schema({
    username: {type: String, required: true},
    hashedPassword: {type: String, required: true},
    likes: [{type: Schema.Types.ObjectId, ref: "Theater"}]
});

module.exports = model("User", schema);