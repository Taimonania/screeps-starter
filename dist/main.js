"use strict";
const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const autoSpawn = require("autospawn");
module.exports.loop = function () {
    autoSpawn({ desiredHarvester: 3, desiredUpgrader: 5, desiredBuilder: 3 });
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "harvester" /* Role.Harvester */) {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == "upgrader" /* Role.Upgrader */) {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == "builder" /* Role.Builder */) {
            roleBuilder.run(creep);
        }
    }
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
};
