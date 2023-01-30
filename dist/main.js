"use strict";
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transporter');
const autoSpawn = require('autospawn');
const desiredWorkers = 7;
const desiredUpgraders = 2;
module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    if (Game.spawns['Spawn1'].spawning === null) {
        autoSpawn({ desiredWorkers, desiredUpgraders });
    }
    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.store.getUsedCapacity() === 0) {
            creep.memory.job = "Harvesting" /* Job.Harvesting */;
            creep.say('🌽');
        }
        if (creep.memory.job === "Harvesting" /* Job.Harvesting */) {
            roleHarvester.run(creep);
        }
        if (creep.memory.job === "Transporting" /* Job.Transporting */) {
            roleTransporter.run(creep);
        }
        if (creep.memory.job === "Upgrading" /* Job.Upgrading */) {
            roleUpgrader.run(creep);
        }
        if (creep.memory.job === "Building" /* Job.Building */) {
            roleBuilder.run(creep);
        }
    }
};
