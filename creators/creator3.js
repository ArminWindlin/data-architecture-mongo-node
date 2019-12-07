const {Parent3} = require('../models/model3');

module.exports.createData = () => {

    let index = 0;
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            let nature = 'region-test';

            // determine units and fields
            let children = createChildren(index);

            // Save region
            const parentO = {
                'index': index,
                'number': 'x' + x + 'y' + y,
                'owner': 'npc',
                'nature': nature,
                'units': [100, 200, 300, 400, 500, 600, 700],
                'xPos': x,
                'yPos': y,
                'layer': 2,
                'recruiting': [0, 1, 2],
                'children': children.childs,
                'child': children.portalIndex,
                'team': '',
            };
            const parent = new Parent3(parentO);
            parent.save((err, field) => {
                if (err) console.log('Error creating world: ' + err);
            });
            index++;
        }
    }
};

function createChildren(parentIndex) {
    let childs = [];
    let index = 0;
    let portalIndex = 0;

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            let nature = 'child-test';
            if (nature === 'portal')
                portalIndex = index;

            let child = {
                'number': 'x' + x + 'y' + y,
                'owner': 'npc',
                'nature': nature,
                'working': -1,
                'doneAt': 1,
                'units': [10, 20, 30, 40, 50, 60, 70],
                'xPos': x,
                'yPos': y,
                'parent': parentIndex,
                'layer': 1,
                'index': index,
                'recruiting': [1, 4],
                'skills': getSkills(),
                'team': '',
            };

            childs.push(child);
            index++;
        }
    }
    return {
        childs: childs,
        portalIndex: portalIndex,
    };
}

function getSkills() {
    return {
        activated: [],
        silverStones: 18,
        strength: 0,
        speed: 0,
        defense: 0,
        healing: 0,
        recruiting: 0,
        creating: 1,
        effects: {
            immune: true,
            extraSpeed: false,
            extraAttack: true,
            magicSleep: false,
            rift: false,
        },
    };
}