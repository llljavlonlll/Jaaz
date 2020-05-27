import React from "react";
import "./PaginationComponent.css";
// import { FormattedMessage } from "react-intl";

const calcDisplayNums = (pageNumbers, currentPage) => {
    if (pageNumbers.length <= 5) return pageNumbers;

    if (currentPage < 3) return [1, 2, 3, 4, 5];

    if (currentPage > pageNumbers[pageNumbers.length - 3])
        return pageNumbers.slice(pageNumbers.length - 5);

    return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
    ];
};

const PaginationComponent = ({
    totalQuesitons,
    questionsPerPage,
    changePage,
    currentPage,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalQuesitons / questionsPerPage); i++) {
        pageNumbers.push(i);
    }

    const displayNumbers = calcDisplayNums(pageNumbers, currentPage);

    return (
        <div className="pagination">
            <button
                className="pagination__button"
                onClick={() => {
                    if (currentPage > 1) {
                        changePage(currentPage - 1);
                    }
                }}
            >
                &#60;{" "}
                {/*<FormattedMessage id="pagination.prev" defaultMessage="Prev" />*/}
            </button>
            {displayNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => changePage(num)}
                    className={
                        currentPage === num
                            ? "pagination__button--selected"
                            : "pagination__button"
                    }
                >
                    {num}
                </button>
            ))}
            <button
                className="pagination__button"
                onClick={() => {
                    if (currentPage < pageNumbers[pageNumbers.length - 1]) {
                        changePage(currentPage + 1);
                    }
                }}
            >
                {/*<FormattedMessage id="pagination.next" defaultMessage="Next" />{" "}*/}
                &#62;
            </button>
        </div>
    );
};

export default PaginationComponent;
