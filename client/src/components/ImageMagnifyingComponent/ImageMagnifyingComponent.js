/*
    *required props
    
    modalState: Boolean     (Modal state)*
    url: String             (Image url)*
    closeModal: function    (Function to close modal/state)*
*/

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

import "./ImageMagnifyingComponent.css";

export default function ImageMagnifyingComponent(props) {
    const [isModalOpen, setIsModalOpen] = useState(props.modalState);

    useEffect(() => {
        setIsModalOpen(props.modalState);
    }, [props.modalState]);

    if (!isModalOpen) return null;

    return (
        <div className="image-modal">
            <div
                className="image-modal__close-button"
                onClick={props.closeModal}
            >
                <MdClose size="1.5em" />
            </div>
            <img src={props.url} alt="Magnified question or solution" />
        </div>
    );
}
