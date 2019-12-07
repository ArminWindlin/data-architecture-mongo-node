const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: 'enter index of the field',
    },
    number: {
        type: String,
        required: 'enter the number of the field',
    },
    owner: {
        type: String,
        required: 'enter the owner of the field',
    },
    units: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0],
    },
    nature: {
        type: String,
        required: 'enter the nature of the field',
    },
    xPos: {
        type: Number,
        required: 'enter xPos of the field',
    },
    yPos: {
        type: Number,
        required: 'enter yPos of the field',
    },
    working: {
        type: Number,
        default: -1,
    },
    doneAt: {
        type: Date,
        default: Date.now,
    },
    layer: {
        type: Number,
        required: 'enter layer of the field',
    },
    team: {
        type: String,
        default: '',
    },
    recruiting: [Number],
    children: [Number],
    skills: Object,
});

module.exports.Parent2 = mongoose.model('Parent2', parentSchema);

const childSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: 'enter index of the field',
    },
    parent: {
        type: Number,
        required: 'enter parent index of the field',
    },
    number: {
        type: String,
        required: 'enter the number of the field',
    },
    owner: {
        type: String,
        required: 'enter the owner of the field',
    },
    units: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0],
    },
    nature: {
        type: String,
        required: 'enter the nature of the field',
    },
    xPos: {
        type: Number,
        required: 'enter xPos of the field',
    },
    yPos: {
        type: Number,
        required: 'enter yPos of the field',
    },
    working: {
        type: Number,
        default: -1,
    },
    doneAt: {
        type: Date,
        default: Date.now,
    },
    layer: {
        type: Number,
        required: 'enter layer of the field',
    },
    team: {
        type: String,
        default: '',
    },
    recruiting: [Number],
    skills: Object,
});

module.exports.Child2 = mongoose.model('Child2', childSchema);
