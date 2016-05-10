var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, targetIndex) {

	if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.sourceTarget = undefined;
	}
	if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
		creep.memory.building = true;
		creep.memory.sourceTarget = undefined;
	}

        if(creep.memory.sourceTarget == undefined)
        {
            var sources = creep.room.find(FIND_STRUCTURES)
                                .filter((s)=>{return s.structureType == STRUCTURE_CONTAINER;})
                                .sort((s1, s2)=>{return s1.pos.getRangeTo(creep)-s2.pos.getRangeTo(creep);});            
            
                        var sources = creep.room.find(FIND_STRUCTURES).filter((s)=>{return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) > 0;});
            
            if(sources.length > 0)
            {
                creep.memory.sourceTarget = sources[0].id;
                creep.memory.sourceTargetType = STRUCTURE_CONTAINER;
            }
            else
            {
                var sources = creep.room.find(FIND_SOURCES).sort((s1, s1)=>{return s1.pos.getRangeTo(creep)-s2.pos.getRangeTo(creep);});
                creep.memory.sourceTarget = sources[0].id;
                creep.memory.sourceTargetType = 'mine';    
        }

	   
	    if(creep.memory.building) {
	        creep.memory.sourceTarget = undefined;
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[targetIndex]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[targetIndex]);
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
	    else {
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
	}
};

module.exports = roleBuilder;
