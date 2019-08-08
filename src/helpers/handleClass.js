const handleClass = (classId, data) => {
    let tempData = data.filter(char => char.classId === +classId);
    return tempData;
};

module.exports = handleClass;
