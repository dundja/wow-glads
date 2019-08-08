import React from "react";
import "./Loader.scss";
import elipp from "../assets/img/elipp-loader.svg";

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <img src={elipp} alt="Loader" />
        </div>
    );
};

export default Loader;
