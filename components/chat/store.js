const Model = require("./model");

async function addChat(chat) {
  const myChat = new Model(chat);
  const savedMessage = await myChat.save();
  return savedMessage;
}

function listChats(userId) {
  /*return new Promise((resolve, reject) => {
    let filter = {};
    if (userId) {
      filter = {
        users: userId,
      };
    }

    Model.find(filter)
      .populate("users")
      .exec((err, populated) => {
        if (err) {
          reject(err);
        }

        resolve(populate);
      });
  });*/

  return new Promise((resolve, reject) => {
    let filter = {};

    if (userId) {
      filter = { users: userId };
    }

    Model.find(filter)
      .populate("users")
      .exec((error, populatedData) => {
        if (error) {
          reject(error);
        }
        resolve(populatedData);
      });
  });
}

module.exports = {
  list: listChats,
  add: addChat,
};
