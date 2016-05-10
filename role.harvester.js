var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.sourceTarget == undefined)
        {
            var sources = creep.room.find(FIND_STRUCTURES).filter((s)=>{return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) > 0;});
            
            if(sources.length > 0)
            {
                creep.memory.sourceTarget = sources[Math.floor(Math.random()*sources.length)].id;
                creep.memory.sourceTargetType = STRUCTURE_CONTAINER;
            }
            else
            {
                var sources = creep.room.find(FIND_SOURCES);
                //creep.memory.sourceTarget = sources[Math.floor(Math.random()*sources.length)].id;
                creep.memory.sourceTarget = sources[0].id;
                creep.memory.sourceTargetType = 'mine';    
            }
            
        }
        
	    if(creep.carry.energy < creep.carryCapacity) 
	    {
            var source = Game.getObjectById(creep.memory.sourceTarget);
            var transferRC;
            if(creep.memory.sourceTargetType == STRUCTURE_CONTAINER)
            {
                transferRC = source.transfer(creep, RESOURCE_ENERGY);
            }
            else
            {
                transferRC = creep.harvest(source);
            }
            if(transferRC == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(source);
            }
            else if(transferRC == ERR_NOT_ENOUGH_RESOURCES)
            {
                creep.memory.sourceTarget = undefined;
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            creep.memory.sourceTarget = undefined;
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                
            }
            else
            {
                var targets = creep.room.find(FIND_FLAGS
                , {
                    filter: { name : 'Idle' }
                }
                );
                if(targets.length > 0)
                {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleHarvester;
