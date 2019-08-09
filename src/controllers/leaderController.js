const request = require("request-promise-native");
const getToken = require("../utils/token");
const pagination = require("../utils/pagination");
const handleFaction = require("../helpers/handleFaction");
const handleRealms = require("../helpers/handleRealms");
const handleClass = require("../helpers/handleClass");
// const getCharacterData = require("../helpers/getCharacterData");
// const classes = require("../utils/classes");

async function leaderController(req, res) {
    const token = await getToken();
    // const bracket = req.body ? req.body.bracket : "3v3";
    // const bracket = "3v3";
    const bracket = req.query.bracket ? req.query.bracket : "3v3";
    const page = req.query.page ? +req.query.page : 1;
    const region = req.query.region ? req.query.region : "eu";
    let locale;
    if (region === "eu") {
        locale = "en_EU";
    } else if (region === "us") {
        locale = "en_US";
    }

    try {
        const data = await request.get({
            url: `https://${region}.api.blizzard.com/wow/leaderboard/${bracket}?locale=${locale}`,
            json: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        let tempData = data.rows;
        //faction filter
        if (req.query.faction) {
            tempData = handleFaction(req.query.faction, tempData);
        }
        // realm filter
        if (req.query.realm) {
            tempData = handleRealms(req.query.realm, tempData);
        }
        // class filter
        if (req.query.class) {
            tempData = handleClass(req.query.class, tempData);
        }

        const totalCharacters = tempData.length;
        let result = pagination(page, tempData.length, tempData);

        // coz of performance issue, i will load avatar img on front
        const handleRequest = async char => {
            const charName = encodeURI(char.name.toLowerCase());
            const charRealm = char.realmSlug;
            const locale = region === "eu" ? "en_EU" : "en_US";
            // https://eu.api.blizzard.com/wow/character/ravencrest/clickzz?fields=pvp%2Cguild&locale=en_EU
            const data = await request.get({
                url: `https://${region}.api.blizzard.com/wow/character/${charRealm}/${charName}?fields=guild%2Cpvp&locale=${locale}`,
                json: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // https://render-eu.worldofwarcraft.com/character/outland/124/81948796-avatar.jpg
            char.thumbnail = `https://render-eu.worldofwarcraft.com/character/${
                data.thumbnail
            }`;

            return Promise.resolve({
                ...char,
                ...data
            });
        };

        const getCharacterData = chars => {
            return Promise.all(chars.map(char => handleRequest(char)));
        };

        let charData = await getCharacterData(result.tempData);
        res.json({
            data: charData,
            totalPages: result.totalPages,
            totalCharacters
        });
    } catch (err) {
        console.log({ message: "Something is wrong...", err });
    }
}

module.exports = leaderController;
