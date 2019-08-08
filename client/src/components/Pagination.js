import React, { useRef } from "react";

import "./Pagination.scss";

const Pagination = ({ activePage, setActivePage, totalPages, isLoading }) => {
    const firstPage = useRef(null);
    const lastPage = useRef(null);
    const minusPage = useRef(null);
    const plusPage = useRef(null);

    const handleRefClick = node => {
        switch (node.current.innerText) {
            case ">>":
                setActivePage(totalPages);
                break;
            case ">":
                setActivePage(activePage + 1);
                break;
            case "<<":
                setActivePage(1);
                break;
            case "<":
                setActivePage(activePage - 1);
                break;
            default:
                break;
        }
    };

    const handleClick = e => {
        setActivePage(+e.currentTarget.textContent);
    };

    const handlePages = pagesArr => {
        return pagesArr.map((page, i) => {
            const activeClass = page === activePage ? "active-page" : "";
            return (
                <div
                    disabled={isLoading}
                    className={`${activeClass}`}
                    onClick={handleClick}
                    key={i}
                >
                    {page}
                </div>
            );
        });
    };

    const renderPages = () => {
        if (totalPages <= 3) {
            return totalPages === 3
                ? handlePages([1, 2, 3])
                    ? totalPages === 2
                    : handlePages([1, 2])
                : handlePages([1]);
        }
        if (activePage < 4) {
            return handlePages([1, 2, 3, 4]);
        } else if (activePage >= 4 && activePage < totalPages - 4) {
            return handlePages([
                activePage - 2,
                activePage - 1,
                activePage,
                activePage + 1,
                activePage + 2
            ]);
        } else {
            return handlePages([
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            ]);
        }
    };

    return (
        <div className={`pagination`}>
            {activePage > 3 && (
                <div
                    disabled={isLoading}
                    ref={firstPage}
                    onClick={() => handleRefClick(firstPage)}
                >
                    {"<<"}
                </div>
            )}
            {activePage > 3 && (
                <div
                    disabled={isLoading}
                    ref={minusPage}
                    onClick={() => handleRefClick(minusPage)}
                >
                    {"<"}
                </div>
            )}
            {activePage > 3 && <span>...</span>}
            {renderPages()}
            {activePage < totalPages - 4 && <span>...</span>}
            {activePage < totalPages - 4 && (
                <div
                    disabled={isLoading}
                    ref={plusPage}
                    onClick={() => handleRefClick(plusPage)}
                >
                    {">"}
                </div>
            )}
            {activePage < totalPages - 4 && (
                <div
                    disabled={isLoading}
                    ref={lastPage}
                    onClick={() => handleRefClick(lastPage)}
                >
                    {">>"}
                </div>
            )}
        </div>
    );
};

export default Pagination;
