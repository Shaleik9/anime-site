const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String, 
    required: true
  },
  user: {
    type: ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);