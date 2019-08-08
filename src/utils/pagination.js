const pagination = (current, totalLength, data) => {
    let dataPerPage = 50;
    let tempData;
    const totalPages = Math.round(totalLength / dataPerPage);

    if (current === 1) {
        tempData = data.slice(0, dataPerPage);
    } else if (current > 1 && current <= totalPages) {
        const start = (current - 1) * dataPerPage;
        const end = start + dataPerPage;
        tempData = data.slice(start, end);
    } else if (current > totalPages) {
        current = totalPages;
        const start = (current - 1) * dataPerPage;
        const end = start + dataPerPage;
        tempData = data.slice(start, end);
    }

    return {
        tempData,
        totalPages
    };
};

module.exports = pagination;
