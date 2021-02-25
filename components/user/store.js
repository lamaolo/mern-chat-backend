const Model = require("./model");

async function addUser(user) {
  const myUser = new Model(user);
  await myUser.save();
  return myUser;
}

async function getUsers() {
  const users = await Model.find();
  return users;
}

module.exports = {
  add: addUser,
  list: getUsers,
};
