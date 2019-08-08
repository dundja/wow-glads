import React, { useState, useEffect } from "react";
import euRealms from "../eu-realms";
import usRealms from "../us-realms";

import c1 from "../assets/img/1_fade.png";
import c2 from "../assets/img/2_fade.png";
import c3 from "../assets/img/3_fade.png";
import c4 from "../assets/img/4_fade.png";
import c5 from "../assets/img/5_fade.png";
import c6 from "../assets/img/6_fade.png";
import c7 from "../assets/img/7_fade.png";
import c8 from "../assets/img/8_fade.png";
import c9 from "../assets/img/9_fade.png";
import c10 from "../assets/img/10_fade.png";
import c11 from "../assets/img/11_fade.png";
import c12 from "../assets/img/12_fade.png";

import "./SearchBox.scss";
import SortBy from "./SortBy";

const classes = [
    {
        name: "warrior",
        img: c1,
        id: 1
    },
    {
        name: "paladin",
        img: c2,
        id: 2
    },
    {
        name: "hunter",
        img: c3,
        id: 3
    },
    {
        name: "rogue",
        img: c4,
        id: 4
    },
    {
        name: "preist",
        img: c5,
        id: 5
    },
    {
        name: "death-knight",
        img: c6,
        id: 6
    },
    {
        name: "shaman",
        img: c7,
        id: 7
    },
    {
        name: "mage",
        img: c8,
        id: 8
    },
    {
        name: "warlock",
        img: c9,
        id: 9
    },
    {
        name: "monk",
        img: c10,
        id: 10
    },
    {
        name: "druid",
        img: c11,
        id: 11
    },
    {
        name: "demon-hunter",
        img: c12,
        id: 12
    }
];

const factions = [
    { value: "Both", label: "Both" },
    { value: "Horde", label: "Horde" },
    { value: "Alliance", label: "Alliance" }
];

const brackets = [
    { value: "2v2", label: "2v2" },
    { value: "3v3", label: "3v3" },
    { value: "rbg", label: "RBG" }
];

const SearchBox = ({
    region,
    setPickedFaction,
    setPickedRealm,
    setPickedClass,
    setPickedBracket,
    pickedClass
}) => {
    const [faction, setFaction] = useState({
        value: "",
        label: "Both factions"
    });
    const [realm, setRealm] = useState([{ value: "", label: "All realms" }]);
    const [realms, setRealms] = useState([]);
    const [bracket, setBracket] = useState({ value: "3v3", label: "3v3" });

    useEffect(() => {
        // for now realm list are same for eu and us, fix that leater
        if (region === "eu") {
            let realms = [{ value: "", label: "All realms" }];
            euRealms.forEach(r => {
                realms.push({
                    value: r.toLowerCase(),
                    label: r
                });
            });
            setRealms(realms);
        }
        if (region === "us") {
            let realms = [{ value: "", label: "All realms" }];
            usRealms.forEach(r => {
                realms.push({
                    value: r.toLowerCase(),
                    label: r
                });
            });
            setRealms(realms);
        }
    }, [region]);

    useEffect(() => {
        // workaround for realm.value
        let r = realm.value === undefined ? "" : realm.value;
        setPickedFaction(faction.value);
        setPickedRealm(r);
        setPickedBracket(bracket.value);
    }, [faction, realm, bracket]);

    const handleClassClick = async classId => {
        if (classId === pickedClass) {
            setPickedClass("");
        } else {
            setPickedClass(classId);
        }
    };

    const renderClassBoxes = () => {
        return classes.map((c, i) => {
            const activeClass = pickedClass === c.id ? "active" : "";
            return (
                <span
                    key={i}
                    onClick={() => handleClassClick(c.id)}
                    className={`searchBox__classes-box ${activeClass}`}
                >
                    <img src={c.img} alt={c.name} />
                </span>
            );
        });
    };

    return (
        <div className="searchBox">
            <div className="searchBox__classes">{renderClassBoxes()}</div>
            <div className="searchBox__selects">
                {/* selects */}
                <SortBy
                    option={faction}
                    options={factions}
                    setOption={setFaction}
                />
                <SortBy option={realm} options={realms} setOption={setRealm} />
                <SortBy
                    option={bracket}
                    options={brackets}
                    setOption={setBracket}
                />
            </div>
        </div>
    );
};

export default SearchBox;
