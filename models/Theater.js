const { Schema, model } = require("mongoose");

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true, maxlength: 50},
    imgUrl: {type: String, required: true},
    public: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    likes: [{type: Schema.Types.ObjectId, ref:"User"}],
    allLikes: {type: Number, default: 0},
    owner: {type: Schema.Types.ObjectId, ref: "User"}
});


module.exports = model("Theater", schema);