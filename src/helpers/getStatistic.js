const getStatistic = arr => {
    let result = [];
    arr.forEach(category => {
        if (category.id === 21) {
            result = category.subCategories[0].statistics.filter(
                item => item.id === 595 || item.id === 370
            );
        }
    });

    return result;
};

module.exports = getStatistic;
