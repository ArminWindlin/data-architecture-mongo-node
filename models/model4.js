const mongoose = require('mongoose');

// create parent database model
const parentSchema = new mongoose.Schema({
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
    index: {
        type: Number,
        required: 'enter index of the field',
    },
    team: {
        type: String,
        default: '',
    },
    child: {
        type: Number,
        required: 'enter child of the field',
    },
    recruiting: [Number],
    children: [Object],
    skills: Object,
});

module.exports.Parent = mongoose.model('Parent4', parentSchema);
