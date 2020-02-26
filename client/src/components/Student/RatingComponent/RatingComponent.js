import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";

import "./RatingComponent.css";
import { FormattedMessage } from "react-intl";

export default function RatingComponent() {
    const [rating, setRating] = useState(1);

    const rate = (event, newRating) => {
        setRating(newRating);
    };

    return (
        <div className="rating">
            <div>
                <FormattedMessage
                    id="rating.title"
                    defaultMessage="Rate the solution"
                />
            </div>
            <Rating
                name="answer-rating"
                value={rating}
                size="large"
                onChange={rate}
            />
        </div>
    );
}
