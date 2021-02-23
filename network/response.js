exports.success = function (req, res, message, status = 200) {
  res.status(status).send({ error: null, body: message });
};

exports.error = function (req, res, message, status = 500, details) {
  details && console.error(details);
  res.status(status).send({ error: message, body: null });
};
