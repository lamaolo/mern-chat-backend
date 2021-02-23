const store = require("./store");
const isValidObjectId = require("mongoose").isValidObjectId;

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error(
        "[messageController]: El usuario o el mensaje no están definidos"
      );
      reject(`Datos incorrectos`);
    }

    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
    };

    store
      .add(fullMessage)
      .then(() => resolve(fullMessage))
      .catch((error) => reject(error));
  });
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    store
      .list(filterUser)
      .then((messages) => resolve(messages))
      .catch((error) => reject(error));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject("El ID y el Mensaje son obligatorios");
    }

    if (!isValidObjectId(id)) {
      console.error("[messageController]: El ID es inválido");
      reject("ID es inválido");
    }

    const result = await store
      .update(id, message)
      .then((updatedMessage) => resolve(updatedMessage))
      .catch((error) => reject(error));
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      console.error("[messageController]: El ID es obligatorio");
      reject("ID es obligatorio");
    }

    if (!isValidObjectId(id)) {
      console.error("[messageController]: El ID es inválido");
      reject("ID es inválido");
    }

    store
      .remove(id)
      .then((id) => {
        resolve(id);
      })
      .catch((error) => reject(error.message));
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
