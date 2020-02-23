import React, { useState } from "react";
import { MdSearch, MdClear } from "react-icons/md";

import "./SearchComponent.css";

export default function SearchComponent(props) {
    const [search, setSearch] = useState("");
    return (
        <div className="admin-users__header__search">
            <span>
                <MdSearch
                    color="#a5afd7"
                    size="2.5rem"
                    onClick={() =>
                        document.getElementById("searchInput").focus()
                    }
                />
            </span>
            <input
                id="searchInput"
                autoComplete="off"
                type="text"
                placeholder={`${props.placeholder}`}
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    props.filter(e.target.value);
                }}
                style={{ marginLeft: "0.5rem" }}
            ></input>
            <span>
                <MdClear
                    color="#a5afd7"
                    onClick={() => {
                        setSearch("");
                        props.filter("");
                    }}
                />
            </span>
        </div>
    );
}
