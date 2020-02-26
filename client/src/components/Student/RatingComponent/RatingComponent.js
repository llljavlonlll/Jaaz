import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import Axios from "axios";

import "./RatingComponent.css";
import { FormattedMessage } from "react-intl";

export default function RatingComponent(props) {
    const [rating, setRating] = useState(1);
    const [rated, setRated] = useState(false);

    const rate = (event, newRating) => {
        setRating(newRating);
        setRated(true);
        Axios.post(`/api/rate/${props.questionId}`, {
            rating: newRating
        })
            .then(res => {})
            .catch(err => {
                console.log(err.message);
                setRating(1);
                setRated(false);
            });
    };

    useEffect(() => {
        if (props.rating) {
            setRating(props.rating || 1);
            setRated(true);
        }
    }, [props.rating]);

    return (
        <div className="rating">
            <div>
                {rated ? (
                    <FormattedMessage
                        id="rating.rated"
                        defaultMessage="Thank you for the feedback!"
                    />
                ) : (
                    <FormattedMessage
                        id="rating.rate"
                        defaultMessage="Rate the solution"
                    />
                )}
            </div>
            <Rating
                name="answer-rating"
                value={rating}
                size="large"
                onChange={rate}
                readOnly={rated}
            />
        </div>
    );
}
