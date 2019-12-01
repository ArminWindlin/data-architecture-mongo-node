const mongoose = require('mongoose');
const {Parent} = require('./models/model4');

// Setup database connection
mongoose.connect('mongodb://localhost/testing', {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    run();
});

// GOAL //
// GET everything
// GET one parent (without children)
// GET one child
// GET all children of one parent
// UPDATE one parent
// UPDATE one child

async function run() {
    try {
        // GET everything
        let ms = Date.now();
        let parents = await Parent.find({});
        console.log('GET all Parents wit Childs:\n' + (Date.now() - ms));

        // GET one parent with children
        ms = Date.now();
        let parent = await Parent.findOne({index: 5});
        console.log('GET one Parent wit Childs:\n' + (Date.now() - ms));

        // GET one child
        ms = Date.now();
        let match = {
            index: 5,
        };
        let projection = {
            child: {$arrayElemAt: ['$children', 25]},
        };
        let child = await Parent.aggregate([{$match: match}, {$project: projection}]);
        // console.log(child[0].child);
        console.log('GET one Child:\n' + (Date.now() - ms));

        // PUT one

    } catch (err) {
        console.error(err);
    }
}