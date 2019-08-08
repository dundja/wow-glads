const handleRealms = (realm, data) => {
    let tempData = data.filter(char => char.realmSlug === realm);
    return tempData;
};

module.exports = handleRealms;
