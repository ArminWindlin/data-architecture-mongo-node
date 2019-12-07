const mongoose = require('mongoose');
const creator2 = require('./creators/creator2');
const creator3 = require('./creators/creator3');

// Setup database connection
mongoose.connect('mongodb://localhost/testing', {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    creator2.createData();
    creator3.createData();
});