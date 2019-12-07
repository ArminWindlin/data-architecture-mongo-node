const {Parent, Child} = require('../models/model1');

module.exports.createData = () => {

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            let nature = 'region-test';

            // determine units and fields
            let children = createChildren();

            // Save region
            const parentO = {
                'number': 'x' + x + 'y' + y,
                'owner': 'npc',
                'nature': nature,
                'units': [100, 200, 300, 400, 500, 600, 700],
                'xPos': x,
                'yPos': y,
                'parent': -1,
                'parentCode': 'none',
                'layer': 2,
                'recruiting': [0, 1, 2],
                'children': children,
                'team': '',
            };
            const parent = new Parent(parentO);
            parent.save((err, field) => {
                if (err) console.log('Error creating world: ' + err);
            });
        }
    }
};

function createChildren() {
    let childs = [];

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            let nature = 'child-test';

            let childO = {
                'number': 'x' + x + 'y' + y,
                'owner': 'npc',
                'nature': nature,
                'working': -1,
                'doneAt': 1,
                'units': [10, 20, 30, 40, 50, 60, 70],
                'xPos': x,
                'yPos': y,
                'layer': 1,
                'recruiting': [1, 4],
                'skills': getSkills(),
                'team': '',
            };

            let child = new Child(childO);

            childs.push(child);
        }
    }
    return childs;
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