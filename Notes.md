- At least one creep should always be upgrading the controller


Spawn a builder: 
`Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder2',
    { memory: { role: 'builder' } } );`



Body part	Build cost	Effect
MOVE	50	Moves the creep. Reduces creep fatigue by 2/tick. See movement.
WORK	100	Harvests energy from target source. Gathers 2 energy/tick.
Constructs a target structure. Builds the designated structure at a construction site, at 5 points/tick, consuming 1 energy/point. See building Costs.
Repairs a target structure. Repairs a structure for 100 hits/tick. Consumes 0.01 energy/hit repaired, rounded up to the nearest whole number.
CARRY	50	Stores energy. Contains up to 50 energy units. Weighs nothing when empty.
ATTACK	80	Attacks a target creep/structure. Deals 30 damage/tick. Short-ranged attack (1 tile).
RANGED_ATTACK	150	Attacks a target creep/structure. Deals 10 damage/tick. Long-ranged attack (1 to 3 tiles).
HEAL	250	Heals a target creep. Restores 12 hit points/tick at short range (1 tile) or 4 hits/tick at a distance (up to 3 tiles).
TOUGH	10	No effect other than the 100 hit points all body parts add. This provides a cheap way to add hit points to a creep.
CLAIM	600	
