const store = require("./store");

function addChat(users) {
  return new Promise((resolve, reject) => {
    if (!users || !Array.isArray(users)) {
      reject("Parametros inválidos");
    }

    const chat = {
      users,
    };

    store
      .add(chat)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function listChats(userId) {
  return new Promise((resolve, reject) => {
    store
      .list(userId)
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}

module.exports = {
  addChat,
  listChats,
};
