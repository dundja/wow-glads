import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchBox from "../components/SearchBox";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

import "./Ladder.scss";
import RankingBox from "../components/RankingBox";
import CharacterBox from "../components/CharacterBox";

const Ladder = ({ region }) => {
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [pickedFaction, setPickedFaction] = useState("");
    const [pickedRealm, setPickedRealm] = useState("");
    const [pickedClass, setPickedClass] = useState("");
    const [pickedBracket, setPickedBracket] = useState("3v3");
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getLadder = async () => {
            setIsLoading(true);
            let ladder = await axios.get("/ladder", {
                params: {
                    page: activePage,
                    region,
                    faction: pickedFaction,
                    realm: pickedRealm,
                    class: pickedClass,
                    bracket: pickedBracket
                }
            });

            setCharacters(ladder.data);
            setTotalPages(ladder.data.totalPages);
            setIsLoading(false);
        };

        getLadder();
    }, [
        region,
        pickedFaction,
        pickedRealm,
        pickedClass,
        pickedBracket,
        activePage
    ]);

    const renderTableHeader = () => {
        return (
            <div className="ladder__innerWrapper__characterBoxes-header">
                <div className="ladder__innerWrapper__characterBoxes-header--rank">
                    <h3>Rank</h3>
                </div>
                <div className="ladder__innerWrapper__characterBoxes-header--nameRealm">
                    <h3>Name - realm</h3>
                </div>
                <div className="ladder__innerWrapper__characterBoxes-header--brackets">
                    <span>2v2</span>
                    <span>3v3</span>
                    <span>RBG</span>
                </div>
            </div>
        );
    };

    return (
        <main className="ladder">
            <div className="container">
                <div className="ladder__innerWrapper">
                    <div className="ladder__innerWrapper__upperBoxes">
                        <SearchBox
                            region={region}
                            setPickedFaction={setPickedFaction}
                            setPickedRealm={setPickedRealm}
                            setPickedClass={setPickedClass}
                            pickedClass={pickedClass}
                            setPickedBracket={setPickedBracket}
                        />
                        <RankingBox />
                    </div>
                    <div className="ladder__innerWrapper__middBoxes">
                        {/* total chars and pagination */}
                        <div className="ladder__innerWrapper__middBoxes-totalChars">
                            <p>
                                Total characters{" "}
                                {characters.totalCharacters
                                    ? characters.totalCharacters
                                    : "..."}
                            </p>
                        </div>
                        <div className="ladder__innerWrapper__middBoxes-pagination">
                            <Pagination
                                isOnBottom={false}
                                activePage={activePage}
                                setActivePage={setActivePage}
                                totalPages={totalPages}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    <div className="ladder__innerWrapper__characterBoxes">
                        {renderTableHeader()}
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <CharacterBox
                                region={region}
                                characters={characters.data}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Ladder;
