const Model = require("./model");

async function addMessage(message) {
  const myMessage = new Model(message);
  await myMessage.save();
}

async function getMessages(filterUser) {
  let filter = {};

  // Si el endpoint /messages tiene un query "user", va a filtrar los mensajes de ese usuario:
  // /messages?user=lamaolo => mensajes del usuario 'lamaolo'

  if (filterUser) {
    filter = { user: filterUser };
  }

  const messages = await Model.find(filter);
  return messages;
}

async function updateMessage(id, message) {
  // const foundMessage = await Model.findById(id);
  // foundMessage.message = message;
  const updatedMessage = await Model.findOneAndUpdate(
    { _id: id },
    { message },
    { new: true }
  );
  return updatedMessage;
}

async function removeMessage(id) {
  const exist = await existInDb(id);

  if (!exist) throw new Error("El mensaje no existe");

  const deleted = await Model.findOneAndDelete({
    _id: id,
  });
  return deleted;
}

async function existInDb(id) {
  const exist = await Model.exists({
    _id: id,
  });
  return exist;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  update: updateMessage,
  remove: removeMessage,
};
