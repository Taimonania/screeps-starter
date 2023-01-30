"use strict";
module.exports = {
    /** @param {Creep} creep **/
    run: function (creep) {
        const sources = creep.room.find(FIND_SOURCES);
        const source = sources[0];
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        if (creep.store.getFreeCapacity() === 0) {
            if (creep.memory.role === "Worker" /* Role.Worker */) {
                creep.memory.job = "Transporting" /* Job.Transporting */;
            }
            if (creep.memory.role === "Upgrader" /* Role.Upgrader */) {
                creep.memory.job = "Upgrading" /* Job.Upgrading */;
            }
        }
    },
};
