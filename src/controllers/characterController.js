const request = require("request");
const getToken = require("../utils/token");
const getAchivements = require("../helpers/getAchivements");
const getStatistic = require("../helpers/getStatistic");

async function characterController(req, res) {
    const token = await getToken();
    const region = req.query.region ? req.query.region : "eu";
    let locale;
    if (region === "eu") {
        locale = "en_EU";
    } else if (region === "us") {
        locale = "en_US";
    }

    // if request if from landing page i dont need full data
    if (req.query.fromLanding) {
        request.get(
            {
                url: `https://${region}.api.blizzard.com/wow/character/${
                    req.query.realm
                }/${req.query.charName}?${locale}`,
                json: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            async (err, data) => {
                if (err) {
                    return res.send({ err });
                }

                return res.json(data);
            }
        );
    } else {
        request.get(
            {
                url: `https://${region}.api.blizzard.com/wow/character/${
                    req.query.realm
                }/${
                    req.query.charName
                }?fields=pvp%2Cstatistics%2Citems&${locale}`,
                json: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            async (err, data) => {
                if (err) {
                    return res.send({ err });
                }

                // for mainBg image
                let mainBg;
                if (data.body.thumbnail) {
                    mainBg = data.body.thumbnail.replace(
                        "-avatar.jpg",
                        "-main.jpg"
                    );
                }
                // pull out just 2v2 and 3v3 personal best
                const arenaStatistic = getStatistic(
                    data.body.statistics.subCategories
                );

                let pvpAchivs = await getAchivements(
                    token,
                    region,
                    req.query.realm,
                    req.query.charName
                );

                res.json({
                    charData: {
                        ...data.body,
                        achievements: pvpAchivs,
                        items: {
                            itemLevel: data.body.items.averageItemLevelEquipped
                        },
                        statistics: arenaStatistic,
                        imagesUrl: {
                            avatar: `https://render-eu.worldofwarcraft.com/character/${
                                data.body.thumbnail
                            }`,
                            main: `https://render-eu.worldofwarcraft.com/character/${mainBg}`
                        }
                    }
                });
            }
        );
    }
}

module.exports = characterController;
