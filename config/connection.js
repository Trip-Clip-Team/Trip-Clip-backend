const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tripclip:password99@cluster0.husthv5.mongodb.net/TripClip?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  

});

module.exports = mongoose.connection;
