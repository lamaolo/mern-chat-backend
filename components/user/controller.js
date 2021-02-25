const store = require("./store");

function addUser(name) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject("El nombre es obligatorio");
    }

    const user = {
      name,
    };

    store
      .add(user)
      .then((createdUser) => resolve(createdUser))
      .catch((error) => reject(error));
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    store
      .list()
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}

module.exports = {
  addUser,
  getUsers,
};
