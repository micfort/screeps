var role = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
	        creep.memory.sourceTarget = undefined;
	        creep.memory.repairTarget = undefined;
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.memory.sourceTarget = undefined;
	        creep.memory.repairTarget = undefined;
	    }

        if(creep.memory.sourceTarget == undefined)
        {
            var sources = creep.room.find(FIND_STRUCTURES)
                    .filter((s)=>{return s.structureType == STRUCTURE_CONTAINER;})
                    .sort((s1, s2)=>{return s2.hits-s1.hits;});      
            creep.memory.sourceTarget = sources[0].id;
        }
        
        if(creep.memory.repairTarget == undefined)
        {
            var targets = creep.room.find(FIND_STRUCTURES)
	                    .filter((structure) => {return structure.hits < structure.hitsMax; })
                        .sort((s1, s2)=>{return s1.hits-s2.hits; }); 
            if(targets.length > 0)
            {
                creep.memory.repairTarget = targets[Math.floor(Math.random()*targets.length*10/100)].id;
            }
            else
            {
                creep.memory.repairTarget = undefined;
            }
        }


	    if(creep.memory.repairing) 
	    {
            if(creep.memory.repairTarget != undefined) 
            {
                var target = Game.getObjectById(creep.memory.repairTarget);
                var rcRepair = creep.repair(target);
                if(target.hits == target.hitsMax)
                {
                    creep.memory.repairTarget = undefined;
                }
                else
                {
                    if(rcRepair == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(target);
                    }
                    else if(rcRepair == ERR_INVALID_TARGET)
                    {
                        creep.memory.repairTarget = undefined;
                    }
                }
            }
            else
            {
                var targets = creep.room.find(FIND_FLAGS, {
                    filter: { name : 'Idle' }
                });
                if(targets.length > 0)
                {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else 
	    {
	        var source = Game.getObjectById(creep.memory.sourceTarget);
	        if(source == null || _.sum(source.store) == 0)
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
	}
};

module.exports = role;
