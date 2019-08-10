import React from "react";
import { Link } from "react-router-dom";

import hordeImg from "../assets/img/horde.png";
import allianceImg from "../assets/img/alliance.png";

import "./CharacterBox.scss";
import ScrollToTop from "./ScrollToTop";

const CharacterBox = ({ region, characters, fromLanding }) => {
    const handleClassColor = classId => {
        switch (classId) {
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

    const renderCharacters = () => {
        return characters.map((character, i) => {
            const factionImg = character.faction === 0 ? allianceImg : hordeImg;
            const avatarImg = `https://render-${region}.worldofwarcraft.com/character/${
                character.thumbnail
            }`;
            const classColor = handleClassColor(character.class);
            return (
                <div key={i} className="character__box">
                    <div className="character__box-rank">
                        <p>{character.ranking}</p>
                    </div>
                    <div className="character__box-nameRealm">
                        <img
                            className="character__box-nameRealm-factionImg"
                            src={factionImg}
                            alt="faction img"
                        />
                        <img
                            className={`character__box-nameRealm-avatarImg ${classColor}`}
                            src={avatarImg}
                            onError={e => {
                                e.target.src =
                                    "https://render-us.worldofwarcraft.com/shadow/avatar/1-0.jpg";
                            }}
                            alt="avatar img"
                        />
                        <div className="character__box-nameRealm-text">
                            <Link
                                to={`/profile?name=${character.name}&realm=${
                                    character.realm
                                }`}
                                className={`character__box-nameRealm-text--name ${classColor}`}
                            >
                                {character.name}-{character.realm}
                            </Link>
                            {character.guild && (
                                <h4 className="character__box-nameRealm-text--guild">
                                    {" "}
                                    &lt;{character.guild.name}&gt;{" "}
                                </h4>
                            )}
                        </div>
                    </div>
                    <div className="character__box-brackets">
                        <span>
                            {character.pvp.brackets.ARENA_BRACKET_2v2.rating}
                        </span>
                        <span>
                            {character.pvp.brackets.ARENA_BRACKET_3v3.rating}
                        </span>
                        <span>
                            {character.pvp.brackets.ARENA_BRACKET_RBG.rating}
                        </span>
                    </div>
                </div>
            );
        });
    };

    const renderCharactersFromLanding = () => {
        return characters.map((character, i) => {
            const marginOnFirst = i === 0 ? "8.5rem" : "";
            const factionImg = character.faction === 0 ? allianceImg : hordeImg;
            const avatarImg = `https://render-${region}.worldofwarcraft.com/character/${
                character.thumbnail
            }`;
            const classColor = handleClassColor(character.class);
            return (
                <div
                    key={i}
                    className="character__box"
                    style={{ width: "45rem", marginTop: marginOnFirst }}
                >
                    <div className="character__box-nameRealm">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <img
                                className="character__box-nameRealm-factionImg"
                                src={factionImg}
                                alt="faction img"
                            />
                            <img
                                className={`character__box-nameRealm-avatarImg ${classColor}`}
                                src={avatarImg}
                                onError={e => {
                                    e.target.src =
                                        "https://render-us.worldofwarcraft.com/shadow/avatar/1-0.jpg";
                                }}
                                alt="avatar img"
                            />
                        </div>
                        <div className="character__box-nameRealm-text">
                            <Link
                                to={`/profile?name=${character.name}&realm=${
                                    character.realm
                                }`}
                                className={`character__box-nameRealm-text--name ${classColor}`}
                            >
                                {character.name}-{character.realm}
                            </Link>
                        </div>
                        <p>Level {character.level}</p>
                    </div>
                </div>
            );
        });
    };

    if (characters.length === 0) {
        return (
            <div className="character">
                <h1 className="character__noFound">No characters found.</h1>
            </div>
        );
    }

    if (fromLanding) {
        return (
            <div className="character">
                {renderCharactersFromLanding()}
                {characters.length > 10 && <ScrollToTop />}
            </div>
        );
    }

    return (
        <div className="character">
            {renderCharacters()}
            {characters.length > 10 && <ScrollToTop />}
        </div>
    );
};

export default CharacterBox;
