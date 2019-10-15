import React from "react";
import ContentLoader from "react-content-loader";

export default function QuestionTileLoadingAnimation(props) {
    if (props.mobile) {
        return (
            <ContentLoader
                height={250}
                width={250}
                speed={1}
                primaryColor="#21252d"
                secondaryColor="#8357c5"
                style={{ margin: "2rem 0" }}
            >
                <rect x="16" y="178" rx="4" ry="4" width="117" height="6" />
                <rect x="16" y="189" rx="3" ry="3" width="85" height="6" />
                <rect x="16" y="200" rx="3" ry="3" width="110" height="6" />
                <rect x="16" y="10" rx="0" ry="0" width="219" height="124" />
                <rect x="16" y="149" rx="3" ry="3" width="219" height="20" />
            </ContentLoader>
        );
    }
    return (
        <ContentLoader
            height={100}
            width={492}
            speed={1}
            primaryColor="#21252d"
            secondaryColor="#8357c5"
        >
            <rect x="169" y="58" rx="4" ry="4" width="117" height="6" />
            <rect x="169" y="77" rx="3" ry="3" width="85" height="6" />
            <rect x="305" y="57" rx="3" ry="3" width="163" height="6" />
            <rect x="227" y="175" rx="3" ry="3" width="201" height="6" />
            <circle cx="900" cy="429" r="224" />
            <rect x="10" y="16" rx="0" ry="0" width="128" height="72" />
            <rect x="169" y="18" rx="3" ry="3" width="300" height="20" />
        </ContentLoader>
    );
}
