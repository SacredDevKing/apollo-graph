const mongoose = require('mongoose');

const mongoConnect = mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
});

module.exports = mongoConnect;
