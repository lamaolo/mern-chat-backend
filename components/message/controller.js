const store = require("./store");
const isValidObjectId = require("mongoose").isValidObjectId;
const { socket } = require("../../socket");
const path = require("path");

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error(
        "[messageController]: El usuario o el mensaje no están definidos"
      );
      reject(`Datos incorrectos`);
    }

    let fileUrl = "";
    if (file) {
      // EN /app estoy sirviendo la carpeta public
      fileUrl = path.resolve("/app/files/" + file.filename)
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };

    store
      .add(fullMessage)
      .then((addedMessage) => {
        socket.io.emit("message", addedMessage);
        resolve(addedMessage);
      })
      .catch((error) => reject(error.message ? error.message : error));
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

function getChatMessages(chatId) {
  return new Promise((resolve, reject) => {
    store
      .filterMessageByChat(chatId)
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
  getChatMessages,
};
