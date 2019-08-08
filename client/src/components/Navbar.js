import React from "react";
import { Link } from "react-router-dom";

import usFlag from "../assets/img/us.svg";
import euFlag from "../assets/img/eu.svg";

import "./Navbar.scss";

const Navbar = ({ region, setRegion }) => {
    const navLinks = () => {
        const links = ["Home", "Ladder", "About"];
        return links.map((link, i) => {
            const linkPath = link === "Home" ? "/" : link;
            return (
                <li key={i} className="navbar__nav-item">
                    <Link
                        to={linkPath.toLowerCase()}
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

    return (
        <div className="navigation">
            <div className="container">
                <nav className="navbar">
                    <ul className="navbar__nav">{navLinks()}</ul>
                    <ul className="navbar__nav-second">{navRegion()}</ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
