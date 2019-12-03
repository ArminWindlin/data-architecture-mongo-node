const mongoose = require('mongoose');
const {Parent} = require('./models/model4');
const {Parent2, Child2} = require('./models/model2');

// Setup database connection
mongoose.connect('mongodb://localhost/testing', {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    run();
});

// GOAL //
// GET one parent (without children)
// GET all parents (without children)
// GET one child
// GET all children
// GET all children of one parent
// UPDATE one parent
// UPDATE one child

async function run() {
    await run4();
    await run2();
}

async function run2(){

    try {
        // GET all parents
        let ms1 = Date.now();
        let parents = await Parent2.find({});
        console.log('2 GET all Parents:\n' + (Date.now() - ms1));

        // GET all children
        let ms2 = Date.now();
        let children = await Child2.find({});
        console.log('2 GET all children:\n' + (Date.now() - ms2));

        // GET one parent with children
        let ms3 = Date.now();
        let parent = await Parent2.findOne({index: 5});
        console.log('2 GET one Parent:\n' + (Date.now() - ms3));

        // GET one child
        let ms4 = Date.now();
        let child = await Child2.findOne({parent: 56, index: 45});
        // console.log(child[0].child);
        console.log('2 GET one Child:\n' + (Date.now() - ms4));

        // PUT one

    } catch (err) {
        console.error(err);
    }
}

async function run4(){

    try {
        // GET all children
        let ms1 = Date.now();
        let parents = await Parent.find({});
        console.log('4 GET all children:\n' + (Date.now() - ms1));

        // GET all children of one parent
        let ms2 = Date.now();
        let parent = await Parent.findOne({index: 5});
        console.log('4 GET all children of one parent:\n' + (Date.now() - ms2));

        // GET one child
        let ms3 = Date.now();
        let match = {
            index: 5,
        };
        let projection = {
            child: {$arrayElemAt: ['$children', 25]},
        };
        let child = await Parent.aggregate([{$match: match}, {$project: projection}]);
        // console.log(child[0].child);
        console.log('4 GET one Child:\n' + (Date.now() - ms3));

        // PUT one

    } catch (err) {
        console.error(err);
    }
}