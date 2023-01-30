"use strict";
module.exports = {
    run: function (creep) {
        creep.say('⚡️');
        if (creep.room.controller) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: { stroke: '#ffffff' },
                });
            }
        }
    },
};
