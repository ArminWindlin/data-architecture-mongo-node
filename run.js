const mongoose = require('mongoose');
const {Parent} = require('./models');

// Setup database connection
mongoose.connect('mongodb://localhost/testing', {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    run();
});

function run() {
    let ms = Date.now();
    Parent.find({}, (err, parents) => {
        if (err) return console.error(err);
        console.log(Date.now() - ms);
    });
}