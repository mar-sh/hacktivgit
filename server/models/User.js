const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  github_id: String,
  github_login: String,
  github_avatar: String,
  github_token: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
