const mongoose = require('mongoose');
const creator = require('./creator');

// Setup database connection
mongoose.connect('mongodb://localhost/testing', {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    creator.createData();
});