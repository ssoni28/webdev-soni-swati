var mongoose = require('mongoose');
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUsername = findUserByUsername;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

module.exports = UserModel;

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
  return UserModel.findOne({username: username});
}

function createUser(user) {
  return UserModel.create(user);
}

function findAllUsers() {
  return UserModel.find();
}

function findUserById(userId) {
  return UserModel.findById(userId);
}

function updateUser(userId, user) {
  return UserModel.update({_id: userId}, user);
}

function deleteUser(userId) {
  return UserModel.deleteOne({_id: userId});
}
