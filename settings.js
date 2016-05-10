/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('settings');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    miners: [1, 2],
    maxCreeps: {
        "repairder": 0,
        "builder2": 0,
        "builder": 0,
        "upgrader": 1,
        "harvester": 2,
        "miner": 0,
    },
    creepTemplate:
    {
        "builder": "smallWorker",
        "builder2": "worker",
        "harvester": "smallWorker",
        "upgrader": "smallWorker",
        "miner": "miner",
        "repairder": "repairder"
    },
    creepParts: {
        "smallWorker": [WORK,CARRY,MOVE,MOVE],
        "transporter": [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        "worker": [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        "repairder": [WORK,WORK,CARRY,MOVE,MOVE,MOVE],
        "miner": [WORK,WORK,WORK,WORK,CARRY,MOVE]
    }
}
