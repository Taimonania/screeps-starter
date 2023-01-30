function spawnCreep(name: string, role: Role, job: Job) {
  const id = name + Game.time;
  const newCreep = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], id, {
    // const newCreep = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], id, {
    memory: { role, job },
  });
  if (newCreep === 0) {
    console.log(`Spawning ${id}.`);
  }
}

module.exports = function autoSpawn({
  desiredWorkers,
  desiredUpgraders,
}: {
  desiredWorkers: number;
  desiredUpgraders: number;
}) {
  const currentWorkers = _.filter(Game.creeps, creep => {
    return creep.memory.role === Role.Worker;
  }).length;

  if (desiredWorkers > currentWorkers) {
    return spawnCreep('Worker', Role.Worker, Job.Harvesting);
  }

  const currentUpgraders = _.filter(Game.creeps, creep => creep.memory.role === Role.Upgrader).length;

  if (desiredUpgraders > currentUpgraders) {
    return spawnCreep('Upgrader', Role.Upgrader, Job.Upgrading);
  }
};
