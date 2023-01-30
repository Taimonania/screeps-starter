"use strict";
function spawnCreep(name, role, job) {
    const id = name + Game.time;
    const newCreep = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], id, {
        // const newCreep = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], id, {
        memory: { role, job },
    });
    if (newCreep === 0) {
        console.log(`Spawning ${id}.`);
    }
}
module.exports = function autoSpawn({ desiredWorkers, desiredUpgraders, }) {
    const currentWorkers = _.filter(Game.creeps, creep => {
        return creep.memory.role === "Worker" /* Role.Worker */;
    }).length;
    if (desiredWorkers > currentWorkers) {
        return spawnCreep('Worker', "Worker" /* Role.Worker */, "Harvesting" /* Job.Harvesting */);
    }
    const currentUpgraders = _.filter(Game.creeps, creep => creep.memory.role === "Upgrader" /* Role.Upgrader */).length;
    if (desiredUpgraders > currentUpgraders) {
        return spawnCreep('Upgrader', "Upgrader" /* Role.Upgrader */, "Upgrading" /* Job.Upgrading */);
    }
};
