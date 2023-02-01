function spawnCreep(name: string, role: Role) {
  if (!Game.spawns["Spawn1"].spawning) return;
  const id = name + Math.floor(Math.random() * 10000);
  const bodyParts = calcBodyParts(550, role);
  console.log(`Trying to spawn ${role} creep with body parts: ${bodyParts}`, )
  const newCreep = Game.spawns["Spawn1"].spawnCreep(bodyParts, id, {
    memory: { role, upgrading: false, building: false },
  });
  if (newCreep === 0) {
    console.log(`Spawning ${id}.`);
  } else {
    console.log(`Error: failed to spawn a new creep. Error code: ${newCreep}`);
  }
}

function calcBodyParts(maxCosts: number, role: Role, roadOptimized = true) {
  const numParts = maxCosts / 50;
  const moveFactor = roadOptimized ? 4 : 2;
  const moveParts = Math.ceil(numParts / moveFactor);
  let workParts = 0;
  let carryParts = 0;
  let bodyParts: BodyPartConstant[] = [];
  switch(role) {
    case Role.Harvester:
    case Role.Builder:
    case Role.Upgrader:
      workParts = Math.ceil((numParts - moveParts) / 2)/2;
      carryParts = numParts - moveParts - workParts*2;
      break;
  }
  if (numParts < workParts + moveParts + carryParts) {
    console.log("Error: Not enough body parts in calcBodyParts()");
  }
  return pushBodyParts(workParts, carryParts, moveParts, bodyParts);
}

function pushBodyParts(numWork: number, numCarry: number, numMove: number, bodyParts: BodyPartConstant[]) {
  for (let i = 0; i < numWork; i++) {
    bodyParts.push(WORK);
  }
  for (let i = 0; i < numCarry; i++) {
    bodyParts.push(CARRY);
  }
  for (let i = 0; i < numMove; i++) {
    bodyParts.push(MOVE);
  }
  return bodyParts;
}

module.exports = function autoSpawn({
  desiredHarvester,
  desiredUpgrader,
  desiredBuilder,
}: {
  desiredHarvester: number;
  desiredUpgrader: number;
  desiredBuilder: number;
}) {
  const currentHarvester = _.filter(Game.creeps, (creep) => {
    return creep.memory.role === Role.Harvester;
  }).length;
  if (desiredHarvester > currentHarvester) {
    return spawnCreep("Harvester", Role.Harvester);
  }

  const currentUpgrader = _.filter(
    Game.creeps,
    (creep) => creep.memory.role === Role.Upgrader
  ).length;
  if (desiredUpgrader > currentUpgrader) {
    return spawnCreep("Upgrader", Role.Upgrader);
  }

  const currentBuilder = _.filter(
    Game.creeps,
    (creep) => creep.memory.role === Role.Builder
  ).length;
  if (desiredBuilder > currentBuilder) {
    return spawnCreep("Builder", Role.Builder);
  }
};
