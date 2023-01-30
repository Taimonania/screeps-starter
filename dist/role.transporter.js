"use strict";
module.exports = {
    run: function (creep) {
        creep.say('🚚');
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
                return ((structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            },
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {
                    visualizePathStyle: { stroke: '#ffffff' },
                });
            }
        }
        if (targets.length === 0) {
            creep.memory.job = "Building" /* Job.Building */;
            creep.say('🚧');
        }
    },
};
