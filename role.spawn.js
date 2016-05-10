/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn');
 * mod.thing == 'a thing'; // true
 */

var settings = require('settings');

module.exports = {
    spawnCreep: function(spawn, role)
    {
        var listCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        console.log(listCreeps.length + '/' + settings.maxCreeps[role] + ' creeps of ' + role);
        if(listCreeps.length < settings.maxCreeps[role]) {
            var newName = spawn.createCreep(settings.creepParts[settings.creepTemplate[role]], undefined, {role: role});
            if(typeof(newName) == "string")
            {
                console.log(spawn.name + ': Spawning new "' + role + '" with name "' + newName + '"');
            }
            else
            {
                if(newName == ERR_NOT_ENOUGH_ENERGY)
                {
                    console.log(spawn.name + ': Not enough energy for spawning creep with role ' + role);
                }
            }
        }
    },
    
    run: function(spawn) 
    {
        console.log(spawn.name + ': number of creeps ' + Game.creeps.length + '');
        //if(Game.creeps.length == 0)
        {
            //var newName = spawn.createCreep(settings.creepParts["smallWorker"], undefined, {role: "harvester"});
            //console.log(spawn.name + ': no harvester, creating basic creep "' + newName + '"');
        }
        for(var role in settings.maxCreeps) 
        {
            this.spawnCreep(spawn, role);
        }
    }
};
