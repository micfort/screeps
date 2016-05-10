var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.sourceTarget = undefined;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.memory.sourceTarget = undefined;
	    }

        if(creep.memory.sourceTarget == undefined)
        {
            var sources = creep.room.find(FIND_STRUCTURES)
                                .filter((s)=>{return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) > s.storeCapacity*0.25;})
                                .sort((s1, s2)=>{return s1.pos.getRangeTo(creep)-s2.pos.getRangeTo(creep);});
            if(sources.length > 0)
            {
                creep.memory.sourceTarget = sources[0].id;
            }
            else
            {
                creep.memory.sourceTarget = undefined;
            }
        }


	    if(creep.memory.upgrading) {
	        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            creep.memory.sourceTarget = undefined;
	    }
	    else 
	    {
	        if(creep.memory.sourceTarget != undefined)
	        {
    	        var source = Game.getObjectById(creep.memory.sourceTarget);
    	        if(source == null)
    	        {
    	            creep.memory.sourceTarget = undefined;
    	        }
    	        else
    	        {
                    if(source.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(source);
                    }
    	        }  
	        }
            else
            {
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
};

module.exports = roleUpgrader;
