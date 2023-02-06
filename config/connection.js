// Connecting to MongoDB database.
const mongoose = require('mongoose');

// defaulting to mongodb://127.0.0.1:27017/socialmedia
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose connection is exported as a module
module.exports = mongoose.connection;
