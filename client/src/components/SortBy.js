import React from "react";
import Select from "react-select";

const SortBy = ({ option, options, setOption }) => {
    function handleChange(selectedOption) {
        setOption(selectedOption);
    }

    return (
        <Select
            className="react-select__container"
            classNamePrefix="react-select"
            value={option}
            onChange={handleChange}
            options={options}
            isSearchable={true}
        />
    );
};

export default SortBy;
