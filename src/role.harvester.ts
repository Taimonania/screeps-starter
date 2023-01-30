module.exports = {
  /** @param {Creep} creep **/
  run: function (creep: Creep) {
    const sources = creep.room.find(FIND_SOURCES);
    const source = sources[0];

    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }

    if (creep.store.getFreeCapacity() === 0) {
      if (creep.memory.role === Role.Worker) {
        creep.memory.job = Job.Transporting;
      }

      if (creep.memory.role === Role.Upgrader) {
        creep.memory.job = Job.Upgrading;
      }
    }
  },
};
