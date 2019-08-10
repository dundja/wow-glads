import React, { useState, useEffect } from "react";
import axios from "axios";

import euRealms from "../eu-realms";
import usRealms from "../us-realms";
import SortBy from "../components/SortBy";

import "./Landing.scss";
import CharacterBox from "../components/CharacterBox";
import Loader from "../components/Loader";

const Landing = ({ region }) => {
    const [input, setInput] = useState("");
    const [realm, setRealm] = useState({ value: "", label: "All realms" });
    const [realms, setRealms] = useState([]);
    const [character, setCharacter] = useState([]);
    const [isFetching, setIsFetching] = useState(null);
    let [countChar, setCountChar] = useState(0);

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

    const handleSubmit = async e => {
        e.preventDefault();
        setCountChar(0);
        let isMounted = true;

        if (!input) {
            alert("Please enter name");
        } else if (realm.value === "") {
            setIsFetching(true);
            const allCharacters = await getAll(
                region,
                realms,
                input,
                setCharacter
            );
            if (isMounted) {
                setCharacter(allCharacters);
            }
            setIsFetching(false);
        } else {
            setIsFetching(true);

            try {
                const data = await axios.get("/char", {
                    params: {
                        region,
                        realm: realm.value.toLowerCase(),
                        charName: input.toLowerCase(),
                        fromLanding: true
                    },
                    timeout: 6000
                });
                if (isMounted) {
                    setCharacter([data.data.body]);
                }
                setIsFetching(false);
            } catch (err) {
                console.log(err);
                if (isMounted) {
                    setCharacter({ notFound: "Character not found." });
                }
                setIsFetching(false);
            }
        }
        return () => (isMounted = false);
    };

    // fetch all chars
    const getAll = async (region, realms, input) => {
        const promises = realms.map(realm => handleChar(region, realm, input));
        const results = await Promise.allSettled(promises);
        const sortedResult = [];
        results.forEach(p => {
            if (p.value.data.statusCode === 200) {
                sortedResult.push(p.value.data.body);
            }
        });
        return sortedResult;
    };
    const handleChar = async (region, realm, input) => {
        try {
            const data = await axios.get("/char", {
                params: {
                    region,
                    realm: realm.value,
                    charName: input.toLowerCase(),
                    fromLanding: true
                },
                timeout: 60000
            });

            if (data.data.body.name) {
                setCountChar((countChar += 1));
            }
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject({ notFound: "Character not found" });
        }
    };

    const renderCharacter = () => {
        // coz CharacterBox expecting array
        if (isFetching) {
            return <Loader />;
        } else if (isFetching === null) {
            return null;
            // return <Loader />;
        } else {
            // single char or more
            return (
                <CharacterBox
                    fromLanding={true}
                    region={region}
                    characters={character}
                />
            );
        }
    };

    return (
        <main className="landing">
            <div className="container">
                <div className="landing__formbox">
                    <h1 className="landing__formbox-header">Find gladiator</h1>
                    <form className="landing__formbox__form">
                        <div className="landing__formbox__form__formWrapper">
                            <input
                                className="landing__formbox__form-input"
                                onChange={e => setInput(e.target.value)}
                                value={input}
                                type="text"
                                name="name"
                            />
                            <SortBy
                                option={realm}
                                options={realms}
                                setOption={setRealm}
                            />
                        </div>
                        <button
                            className="landing__formbox__form-button"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isFetching}
                        >
                            Search
                        </button>
                    </form>
                </div>
                {countChar > 1 && (
                    <h1 className="landing__charsFound">
                        <span className={isFetching ? "pulsate" : ""}>
                            Founded characters:
                        </span>{" "}
                        {countChar}
                    </h1>
                )}
                {renderCharacter()}
            </div>
        </main>
    );
};

export default Landing;
