import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import ReactTooltip from "react-tooltip";

import "./CharacterProfile.scss";
import Loader from "../components/Loader";
import achivImg from "../assets/img/wow-glads-ahiv.gif";
import timeImg from "../assets/img/time.svg";

const CharacterProfile = ({ location, region }) => {
    const params = queryString.parse(location.search);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [classColor, setClassColor] = useState("");
    const [brackets, setBrackets] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        let isMounted = true;
        const getProfile = async () => {
            setIsLoading(true);
            try {
                let profileData = await axios.get("/char", {
                    params: {
                        region,
                        realm: params.realm.toLowerCase(),
                        charName: params.name.toLowerCase()
                    }
                });
                console.log(profileData.data.charData);
                if (isMounted) {
                    setProfile(profileData.data.charData);
                    setBrackets([
                        profileData.data.charData.pvp.brackets
                            .ARENA_BRACKET_2v2,
                        profileData.data.charData.pvp.brackets
                            .ARENA_BRACKET_3v3,
                        profileData.data.charData.pvp.brackets.ARENA_BRACKET_RBG
                    ]);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getProfile();

        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        if (profile) {
            setClassColor(handleClassColor(profile.class));
        }
    }, [profile]);

    const handleUpdatedDate = () => {
        const now = new Date().getTime();
        const lastUpd = new Date(profile.lastModified).getTime();
        let diff = now - lastUpd;
        const result = timeConversion(diff);
        return result;
    };

    const renderBrackets = () => {
        return brackets.map((bracket, i) => {
            const infoText =
                bracket.slug === "rbg"
                    ? "Battleground raiting"
                    : `${bracket.slug} arena raiting`;
            return (
                <div key={i} className="profile__brackets-bracket">
                    <p
                        data-tip
                        data-for={`rating${i}`}
                        className="profile__brackets-bracket--raiting"
                    >
                        {bracket.rating}
                    </p>
                    <p className="profile__brackets-bracket--info">
                        {infoText}
                    </p>
                    <ReactTooltip
                        id={`rating${i}`}
                        getContent={() => (
                            <>
                                <p>Wins: {bracket.seasonWon}</p>
                                <p>Lost: {bracket.seasonLost}</p>
                                <p>Total: {bracket.seasonPlayed}</p>
                            </>
                        )}
                    />
                </div>
            );
        });
    };

    const renderPresonalBest = stats => {
        return stats.map((stat, i) => {
            return (
                <p key={i}>
                    {stat.name}: {stat.quantity}
                </p>
            );
        });
    };

    const renderBestAchivements = achivs => {
        let best2v2 = findBestAchievement(achivs, [1159, 401, 400, 399]);
        let best3v3 = findBestAchievement(achivs, [5267, 1160, 405, 403, 402]);
        let best5v5 = findBestAchievement(achivs, [1161, 404, 407, 406]);
        let bestGlad = findBestAchievement(achivs, [2091, 2092, 2093]);
        let bestBG = findBestAchievement(achivs, [
            433,
            434,
            435,
            436,
            437,
            438,
            439,
            440,
            441,
            442,
            443,
            444,
            445,
            446,
            447,
            448,
            449,
            450,
            451,
            452,
            453,
            454,
            468,
            469,
            470,
            471,
            472,
            473,
            6941,
            6942
        ]);
        const bestAchievs = [best2v2, best3v3, best5v5, bestGlad, bestBG];
        return bestAchievs.map(achiv => {
            if (achiv) {
                return (
                    <div className="profile__account-item">
                        <img src={achiv.media[0].value} alt="Achiv icon" />
                        <div className="profile__account-item--text">
                            <h4>{achiv.title}</h4>
                            <p>{achiv.description}</p>
                        </div>
                    </div>
                );
            }
        });
    };

    if (isLoading) {
        return (
            <div className="profile">
                <div className="container">
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="profile__inner">
                    {/* HEADER */}
                    <div className="profile__header">
                        <div className="profile__header-left">
                            <img
                                className={classColor}
                                src={profile.imagesUrl.avatar}
                                alt="avatar img"
                            />
                            <div className="profile__header-left--text">
                                <h3 className={classColor}>
                                    {profile.name}-{profile.realm}
                                </h3>
                                {/* <h3>&lt;{guild}&gt;</h3> */}
                                {profile.level < 120 ? (
                                    <p>Level {profile.level}</p>
                                ) : (
                                    <p>
                                        Average item level equipped{" "}
                                        {profile.items.itemLevel}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="profile__header-right">
                            <div className="profile__header-right--achiv">
                                <img src={achivImg} alt="Achievement img" />
                                <span>{profile.achievementPoints}</span>
                            </div>
                            <div
                                data-tip
                                data-for="timeUpdated"
                                className="profile__header-right--time"
                            >
                                <img src={timeImg} alt="Time img" />
                                <span>{handleUpdatedDate()}</span>
                            </div>
                            <ReactTooltip id="timeUpdated">
                                <span>Last updated</span>
                            </ReactTooltip>
                        </div>
                    </div>
                    {/* BRACKETS */}
                    <div className="profile__brackets">{renderBrackets()}</div>
                    {/* CHARACTER */}
                    <div className="profile__character">
                        <h3>Character</h3>
                        {renderPresonalBest(profile.statistics)}
                    </div>
                    {/* Account */}
                    <div className="profile__account">
                        <h3>Account</h3>
                        <div className="profile__account-inner">
                            {renderBestAchivements(profile.achievements)}
                        </div>
                    </div>
                </div>
                <div
                    className="profile__wrapper"
                    style={{
                        backgroundImage: `url(${profile.imagesUrl.main})`
                    }}
                />
            </div>
        </div>
    );
};

export default CharacterProfile;

// miliseconds to hours
function timeConversion(millisec) {
    let seconds = Math.round((millisec / 1000).toFixed(1));

    let minutes = Math.round((millisec / (1000 * 60)).toFixed(1));

    let hours = Math.round((millisec / (1000 * 60 * 60)).toFixed(1));

    let days = Math.round((millisec / (1000 * 60 * 60 * 24)).toFixed(1));

    if (seconds < 60) {
        return "Now";
    } else if (minutes < 60) {
        return minutes + "min's ago";
    } else if (hours < 24) {
        return hours + "hrs ago";
    } else {
        return days + "days ago";
    }
}

// find personal best achievement
const findBestAchievement = (achivs, target) => {
    let result = null;
    for (let i = 0; i < target.length; i++) {
        let tempRes = null;
        if (
            achivs.some(a => {
                tempRes = a;
                return a.id === target[i];
            })
        ) {
            result = tempRes;
            break;
        }
    }
    return result;
};

// handle class colors
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
