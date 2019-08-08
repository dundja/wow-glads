import React from "react";

import "./RankingBox.scss";

const ratings = [
    {
        title: "Combatant",
        rating: "1400"
    },
    {
        title: "Challenger",
        rating: "1600"
    },
    {
        title: "Rival",
        rating: "1800"
    },
    {
        title: "Duelist",
        rating: "2100"
    },
    {
        title: "Gladiator",
        rating: "50 Wins Above 2400 rating"
    },
    {
        title: "Gladiator Rank 1",
        rating: "0.1% of the best players (by faction and region)"
    }
];

const RankingBox = () => {
    const renderBoxes = () => {
        return ratings.map((rating, i) => (
            <tr key={i} className="rankingBox__table__dataRow">
                <td className="rankingBox__table__dataRow-data">
                    {rating.title}
                </td>
                <td className="rankingBox__table__dataRow-data">
                    {rating.rating}
                </td>
            </tr>
        ));
    };

    return (
        <div className="rankingBox">
            <table className="rankingBox__table">
                <tbody>
                    <tr className="rankingBox__table__headersRow">
                        <th className="rankingBox__table__headersRow-header">
                            Titles
                        </th>
                        <th className="rankingBox__table__headersRow-header">
                            Rating
                        </th>
                    </tr>
                </tbody>
                <tbody>{renderBoxes()}</tbody>
            </table>
        </div>
    );
};

export default RankingBox;
