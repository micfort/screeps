var settings = require('settings');

var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        if(creep.memory.sourceTarget == undefined)
        {
            var sources = creep.room.find(FIND_SOURCES);
            var miners = _.filter(Game.creeps, (c)=>{ return c.memory.role == 'miner';});
            for(var i = 0; i < sources.length && creep.memory.sourceTarget == undefined; i++)
            {
                if(miners.filter((m)=>{return m.memory.sourceTarget == i;}).length < settings.miners[i])
                {
                    creep.memory.sourceTarget = i;
                }
            }
            
        }
        
	    if(creep.carry.energy < creep.carryCapacity) 
	    {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.sourceTarget]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(sources[creep.memory.sourceTarget]);
            }
        }
        else 
        {
            var targets = creep.pos.findInRange(FIND_STRUCTURES, 3)
                    .filter((s) =>{return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity;})
                    .sort((s1, s2) => {return s2.hits - s1.hits;});
            if(targets.length > 0)
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0]);
                }
            }
            else
            {
                console.log("No non-full container in range")
            }
        }
	}
};

module.exports = roleMiner;
