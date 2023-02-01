"use strict";
function spawnCreep(name, role) {
    const id = name + Math.floor(Math.random() * 10000);
    const newCreep = Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], id, {
        // const newCreep = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], id, {
        memory: { role, upgrading: false, building: false },
    });
    if (newCreep === 0) {
        console.log(`Spawning ${id}.`);
    }
}
module.exports = function autoSpawn({ desiredHarvester, desiredUpgrader, desiredBuilder, }) {
    const currentHarvester = _.filter(Game.creeps, (creep) => {
        return creep.memory.role === "harvester" /* Role.Harvester */;
    }).length;
    if (desiredHarvester > currentHarvester) {
        return spawnCreep("Harvester", "harvester" /* Role.Harvester */);
    }
    const currentUpgrader = _.filter(Game.creeps, (creep) => creep.memory.role === "upgrader" /* Role.Upgrader */).length;
    if (desiredUpgrader > currentUpgrader) {
        return spawnCreep("Upgrader", "upgrader" /* Role.Upgrader */);
    }
    const currentBuilder = _.filter(Game.creeps, (creep) => creep.memory.role === "builder" /* Role.Builder */).length;
    if (desiredBuilder > currentBuilder) {
        return spawnCreep("Builder", "builder" /* Role.Builder */);
    }
};
