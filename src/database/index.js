const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gabriel:gabriel123@api-geekspace-sto1i.mongodb.net/geekspace?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;