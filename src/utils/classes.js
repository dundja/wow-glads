const classes = className => {
    switch (className) {
        case 1:
            return "warrior";
        case 2:
            return "paladin";
        case 3:
            return "hunter";
        case 4:
            return "rogue";
        case 5:
            return "preist";
        case 6:
            return "death-knight";
        case 7:
            return "shaman";
        case 8:
            return "mage";
        case 9:
            return "warlock";
        case 10:
            return "monk";
        case 11:
            return "druid";
        case 12:
            return "demon-hunter";
        default:
            return "ERROR";
    }
};

module.exports = classes;
