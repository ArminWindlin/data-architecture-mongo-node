const {Parent} = require('./models');

module.exports.createData = () => {

    let index = 0;
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {

            let nature = 'region-test';
            // determine code
            // cL = codeLetter
            // cN = codeNumber
            let cL = numberToLetter(y + 1);
            let cN = x + 1;
            let fieldCode = cL + cN;

            // determine units and fields
            let children = createChildren(index, fieldCode);

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
                'index': index,
                'code': fieldCode,
                'recruiting': [0, 1, 2],
                'children': children.childs,
                'child': children.portalIndex,
                'skills': getSkills(nature),
                'team': '',
            };
            const parent = new Parent(parentO);
            parent.save((err, field) => {
                if (err) console.log('Error creating world: ' + err);
            });
            index++;
        }
    }
};

function createChildren(parentIndex, parentCode) {
    let childs = [];
    let index = 0;
    let portalIndex = 0;

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            let nature = 'child-test';

            // determine code
            // cL = codeLetter
            // cN = codeNumber
            let cL = numberToLetter(y + 1);
            let cN = x + 1;
            let fieldCode = cL + cN;

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
                'parentCode': parentCode,
                'layer': 1,
                'index': index,
                'code': fieldCode,
                'recruiting': [1, 4],
                'skills': getSkills(nature),
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

function numberToLetter(number) {
    switch (number) {
        case 1:
            return 'A';
        case 2:
            return 'B';
        case 3:
            return 'C';
        case 4:
            return 'D';
        case 5:
            return 'E';
        case 6:
            return 'F';
        case 7:
            return 'G';
        case 8:
            return 'H';
        case 9:
            return 'I';
        case 10:
            return 'J';
        case 11:
            return 'K';
        case 12:
            return 'L';
        case 13:
            return 'M';
        case 14:
            return 'N';
        case 15:
            return 'O';
        case 16:
            return 'P';
        case 17:
            return 'Q';
        case 18:
            return 'R';
        case 19:
            return 'S';
        case 20:
            return 'T';
        case 21:
            return 'U';
        case 22:
            return 'V';
        case 23:
            return 'W';
        case 24:
            return 'X';
        case 25:
            return 'Y';
        case 26:
            return 'Z';
        default:
            return 'Z';
    }
}

function getSkills(nature) {
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
            immune: nature === 'starter' || nature === 'region-starter',
            extraSpeed: nature === 'starter',
            extraAttack: nature === 'starter',
            magicSleep: false,
            rift: false,
        },
    };
}