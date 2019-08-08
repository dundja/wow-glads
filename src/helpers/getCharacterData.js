const request = require("request-promise-native");

const handleRequest = async (token, region, char) => {
    const charName = char.name.toLowerCase();
    const charRealm = char.realmSlug;
    const locale = region === "eu" ? "en_EU" : "en_US";
    const encode = encodeURI(
        `https://${region}.api.blizzard.com/wow/character/${charRealm}/${charName}?locale=${locale}`
    );
    const data = await request.get({
        url: encode,
        json: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    char.avatar = data.thumbnail;

    return Promise.resolve(char);
};

const getCharacterData = (token, region, chars) => {
    return Promise.all(chars.map(char => handleRequest(token, region, char)));
};

module.exports = getCharacterData;
