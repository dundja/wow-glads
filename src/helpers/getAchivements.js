const request = require("request-promise-native");

const getAchivements = async (token, region, realm, charName) => {
    let locale;
    let namespace;
    let charNamespace;
    if (region === "eu") {
        locale = "en_EU";
        namespace = "static-eu";
        charNamespace = "profile-eu";
    } else if (region === "us") {
        locale = "en_US";
        namespace = "static-us";
        charNamespace = "profile-us";
    }
    try {
        let data = await request.get({
            url: `https://${region}.api.blizzard.com/wow/character/${realm}/${charName}?fields=achievements&locale=${locale}`,
            json: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const pvpAchivs = handlePvPAchievements(
            data.achievements.achievementsCompleted
        );

        // get media for ahivs
        const getAchivs = async achiv => {
            let media = await request.get({
                url: `https://${region}.api.blizzard.com/data/wow/media/achievement/${
                    achiv.id
                }?namespace=${namespace}&locale=${locale}`,
                json: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let achivData = await request.get({
                url: `https://${region}.api.blizzard.com/wow/achievement/${
                    achiv.id
                }?locale=${locale}`,
                json: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            achiv.media = media.assets;
            achiv.title = achivData.title;
            achiv.description = achivData.description;
            return Promise.resolve(achiv);
        };

        const handleAchievements = async achievements => {
            return await Promise.all(
                achievements.map(achiv => getAchivs(achiv))
            );
        };

        const result = handleAchievements(pvpAchivs);
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};

// ids of achivements that i need
//         // Just the Two of Us: 1550 - 399 -- 3s : 402 --- 5s: 406,
//         // Just the Two of Us: 1750	- 400 -- 3s : 403 --- 5s: 407,
//         // Just the Two of Us: 2000	- 401 -- 3s : 405 --- 5s: 404,
// 3s: 5267
//         // Just the Two of Us: 2200	- 1159 -- 3s : 1160 --- 5s: 1161,
//         // gladiator - 2091, 2093, 2092
// rated battlegrounds:
// ids: 442,470,471,441,440,439,472,438,448,436,435,473,445,433,454,468,453,450,452,451,449,469,447,444,446,443,434,437,6941,6942

const handlePvPAchievements = achivs => {
    const pvpAchivIds = [
        399,
        400,
        401,
        402,
        403,
        404,
        405,
        406,
        407,
        433,
        434,
        435,
        436,
        437,
        438,
        439,
        440,
        441,
        442,
        443,
        444,
        445,
        446,
        447,
        448,
        449,
        450,
        451,
        452,
        453,
        454,
        468,
        469,
        470,
        471,
        472,
        473,
        1159,
        1160,
        1161,
        2091,
        2092,
        2093,
        5267,
        6941,
        6942
    ];

    let result = [];

    pvpAchivIds.forEach(element => {
        if (achivs.includes(element)) {
            result.push({
                id: element
            });
        }
    });

    return result;
};

module.exports = getAchivements;
