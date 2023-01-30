const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transporter');
const autoSpawn = require('autospawn');

const enum Job {
  Harvesting = 'Harvesting',
  Upgrading = 'Upgrading',
  Building = 'Building',
  Transporting = 'Transporting',
}

const enum Role {
  Worker = 'Worker',
  Upgrader = 'Upgrader',
}

declare interface CreepMemory {
  role: Role;
  job: Job;
}

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
      creep.memory.job = Job.Harvesting;
      creep.say('🌽');
    }

    if (creep.memory.job === Job.Harvesting) {
      roleHarvester.run(creep);
    }

    if (creep.memory.job === Job.Transporting) {
      roleTransporter.run(creep);
    }

    if (creep.memory.job === Job.Upgrading) {
      roleUpgrader.run(creep);
    }

    if (creep.memory.job === Job.Building) {
      roleBuilder.run(creep);
    }
  }
};
