import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import usFlag from "../assets/img/us.svg";
import euFlag from "../assets/img/eu.svg";

import "./Navbar.scss";

const Navbar = ({ region, setRegion }) => {
    const [width, setWidth] = useState(0);
    const [toggled, setToggled] = useState(false);

    window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
    });

    useEffect(() => {
        renderNavContent();
    }, [width]);

    const navLinks = () => {
        const links = ["Home", "Ladder", "About"];
        return links.map((link, i) => {
            const linkPath = link === "Home" ? "/" : link;
            return (
                <li key={i} className="navbar__nav-item">
                    <Link
                        to={linkPath.toLowerCase()}
                        onClick={() => setToggled(false)}
                        className="navbar__nav-item--link"
                    >
                        {link}
                    </Link>
                </li>
            );
        });
    };

    const navRegion = () => {
        const flags = [
            { flag: usFlag, name: "us" },
            { flag: euFlag, name: "eu" }
        ];

        return flags.map((flag, i) => {
            let isActive = "";
            const regionParam = `?region=${flag.name}`;
            if (flag.name === region) {
                isActive = "img-active";
            }
            return (
                <li key={i} className="navbar__nav-second__item">
                    <Link
                        to={regionParam}
                        className="navbar__nav-second__item-link"
                        onClick={() => setRegion(flag.name)}
                    >
                        <img
                            className={isActive}
                            src={flag.flag}
                            alt="Region flag"
                        />
                    </Link>
                </li>
            );
        });
    };

    const renderNavContent = () => {
        let content;
        // if width is smaller than 960px
        if (window.innerWidth < 960) {
            content = (
                <>
                    <div className={`hamNavigation`}>
                        <button
                            className={`hamburger hamburger--emphatic ${
                                toggled ? "is-active" : ""
                            }`}
                            style={{ zIndex: "999" }}
                            type="button"
                            onClick={() => setToggled(!toggled)}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner" />
                            </span>
                        </button>
                    </div>
                    <div
                        className={`hamNavigation__hamContainer ${
                            toggled ? "toggleNav" : ""
                        }`}
                    >
                        <nav className="navbar">
                            <ul className="navbar__nav">{navLinks()}</ul>
                            <ul className="navbar__nav-second">
                                {navRegion()}
                            </ul>
                        </nav>
                    </div>
                </>
            );
        } else {
            content = (
                <div className="navigation">
                    <div className="container">
                        <nav className="navbar">
                            <ul className="navbar__nav">{navLinks()}</ul>
                            <ul className="navbar__nav-second">
                                {navRegion()}
                            </ul>
                        </nav>
                    </div>
                </div>
            );
        }
        return content;
    };

    return renderNavContent();
};

export default Navbar;
