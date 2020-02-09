import React from "react";
import "./PaginationComponent.css";
import { FormattedMessage } from "react-intl";

const PaginationComponent = ({
    totalQuesitons,
    questionsPerPage,
    changePage,
    currentPage
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalQuesitons / questionsPerPage); i++) {
        pageNumbers.push(i);
    }

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
                <FormattedMessage id="pagination.prev" defaultMessage="Prev" />
            </button>
            {pageNumbers.map(num => (
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
                <FormattedMessage id="pagination.next" defaultMessage="Next" />{" "}
                &#62;
            </button>
        </div>
    );
};

export default PaginationComponent;
