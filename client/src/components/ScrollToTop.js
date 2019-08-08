import React from "react";

import "./ScrollToTop.scss";

const ScrollToTop = () => {
    return (
        <button onClick={() => window.scrollTo(0, 0)} className="myButton">
            Back To Top
        </button>
    );
};

export default ScrollToTop;
