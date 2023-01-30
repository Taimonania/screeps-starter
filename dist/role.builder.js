"use strict";
module.exports = {
    run: function (creep) {
        const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites.length > 0) {
            const constructionSite = constructionSites.reduce((a, b) => a.progressTotal - a.progress > b.progressTotal - b.progress ? b : a);
            if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite, {
                    visualizePathStyle: { stroke: '#ffffff' },
                });
            }
        }
        if (constructionSites.length === 0) {
            creep.memory.job = "Upgrading" /* Job.Upgrading */;
            creep.say('⚡️');
        }
    },
};
