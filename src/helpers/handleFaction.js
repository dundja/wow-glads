const handleFaction = (faction, data) => {
    let tempData;
    if (faction === "Allance") {
        tempData = data.filter(char => char.factionId === 0);
    } else if (faction === "Horde") {
        tempData = data.filter(char => char.factionId === 1);
    } else {
        return data;
    }
    return tempData;
};

module.exports = handleFaction;
