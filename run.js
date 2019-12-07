const mongoose = require('mongoose');
const {Parent2, Child2} = require('./models/model2');
const {Parent3} = require('./models/model3');

// Setup database connection
mongoose.connect('mongodb://localhost/testing', {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    run();
});

// Queries //
// GET one parent (without children) > gop
// GET all parents (without children) > gap
// GET one child > goc
// GET all children > gac
// GET all children of one parent > gpc
// UPDATE one parent > uop
// UPDATE one child > uoc

// Database structures //
// Reference model > 2
// 3Nesting model > 3

async function run() {
    let numberOfTests = 100;
    let total = 0;
    let query = 'uoc3';
    for (let i = 0; i < numberOfTests; i++) {
        let r1 = Math.floor(Math.random() * Math.floor(100));
        let r2 = Math.floor(Math.random() * Math.floor(100));

        switch (query) {
            case 'gop2':
                total += await gop2(r1);
                break;
            case 'gop3':
                total += await gop3(r1);
                break;
            case 'gap2':
                total += await gap2();
                break;
            case 'gap3':
                total += await gap3();
                break;
            case 'goc2':
                total += await goc2(r1, r2);
                break;
            case 'goc3':
                total += await goc3(r1, r2);
                break;
            case 'gac2':
                total += await gac2();
                break;
            case 'gac3':
                total += await gac3();
                break;
            case 'gpc2':
                total += await gpc2(r1);
                break;
            case 'gpc3':
                total += await gpc3(r1);
                break;
            case 'uop2':
                total += await uop2(r1);
                break;
            case 'uop3':
                total += await uop3(r1);
                break;
            case 'uoc2':
                total += await uoc2(r1, r2);
                break;
            case 'uoc3':
                total += await uoc3(r1, r2);
                break;
        }

    }
    let average = total / numberOfTests;
    console.log(average);
}

// GET one parent //
// Reference model
async function gop2(index) {
    let ms = Date.now();
    let parent = await Parent2.aggregate([{$match: {index: index}}, {$project: {children: 0}}]);
    return Date.now() - ms;
}

// Nesting model
async function gop3(index) {
    let ms = Date.now();
    let parent = await Parent3.aggregate([{$match: {index: index}}, {$project: {children: 0}}]);
    return Date.now() - ms;
}

// GET all parents //
// Reference model
async function gap2() {
    let ms = Date.now();
    let parents = await Parent2.aggregate([{$project: {children: 0}}]);
    return Date.now() - ms;
}

// Nesting model
async function gap3() {
    let ms = Date.now();
    let parents = await Parent3.aggregate([{$project: {children: 0}}]);
    return Date.now() - ms;
}

// GET one child //
// Reference model
async function goc2(index1, index2) {
    let ms = Date.now();
    let child = await Child2.findOne({parent: index1, index: index2});
    return Date.now() - ms;
}

// Nesting model
async function goc3(index1, index2) {
    let ms = Date.now();
    let projection = {
        child: {$arrayElemAt: ['$children', index2]},
    };
    let child = await Parent3.aggregate([{$match: {index: index1}}, {$project: projection}]);
    // console.log(child[0].child);
    return Date.now() - ms;
}

// GET all children //
// Reference model
async function gac2() {
    let ms = Date.now();
    let children = await Child2.find();
    return Date.now() - ms;
}

// Nesting model
async function gac3() {
    let ms = Date.now();
    let children = await Parent3.aggregate([{$project: {children: 1}}]);
    return Date.now() - ms;
}

// GET all children of one parent //
// Reference model
async function gpc2(index) {
    let ms = Date.now();
    let children = await Child2.find({parent: index});
    return Date.now() - ms;
}

// Nesting model
async function gpc3(index) {
    let ms = Date.now();
    let children = await Parent3.aggregate([{$match: {index: index}}, {$project: {children: 1}}]);
    return Date.now() - ms;
}

// UPDATE one parent //
// Reference model
async function uop2(index) {
    let ms = Date.now();
    let update = await Parent2.updateOne({index: index}, {$set: {owner: 'Bob'}});
    return Date.now() - ms;
}

// Nesting model
async function uop3(index) {
    let ms = Date.now();
    let update = await Parent3.updateOne({index: index}, {$set: {owner: 'Bob'}});
    return Date.now() - ms;
}

// UPDATE one child //
// Reference model
async function uoc2(index1, index2) {
    let ms = Date.now();
    let update = await Child2.updateOne({parent: index1, index: index2}, {$set: {'units.5': 100}});
    return Date.now() - ms;
}

// Nesting model
async function uoc3(index1, index2) {
    let ms = Date.now();
    let ref = `children.${index2}.units.5`;
    let update = await Parent3.updateOne({index: index1}, {$inc: {[ref]: 100}});
    // console.log(child[0].child);
    return Date.now() - ms;
}

// Notes
// await mongoose.connection.db.collection('parent2').getPlanCache().clear();
