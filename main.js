var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleRepairder = require('role.repairder');

var roleSpawn = require('roleSpawn');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    //var structures = _.filter(Game.structures, (s) => { return s.hits != undefined && s.hitsMax != undefined});
    //console.log(structures);
    //console.log("Structures needs repair: " + structures.filter((s) => { return s.hits < s.hitsMax; }).length + "/" + structures.length);

    roleSpawn.run(Game.spawns['Central command']);


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            //roleBuilder.run(creep, 0);
            var targets = creep.room.find(FIND_FLAGS, {
                    filter: { name : 'Idle' }
                });
                if(targets.length)
                {
                    creep.moveTo(targets[0]);
                }
        }
        if(creep.memory.role == 'builder2') {
            roleBuilder.run(creep, 0);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'repairder') {
            //roleRepairder.run(creep);
            var targets = creep.room.find(FIND_FLAGS, {
                    filter: { name : 'Idle' }
                });
                if(targets.length)
                {
                    creep.moveTo(targets[0]);
                }
        }
    }
}
