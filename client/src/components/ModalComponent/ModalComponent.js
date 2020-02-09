import React from "react";
import Modal from "react-modal";

import styles from "./ModalComponentStyles";
import { FormattedMessage } from "react-intl";

export default function BookModalComponent(props) {
    return (
        <Modal
            ariaHideApp={false}
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={styles.modalStyle}
            contentLabel="Example Modal"
        >
            <h2 style={styles.modalTitleStyle}>
                <FormattedMessage
                    id="modal.title"
                    defaultMessage="Are you sure?"
                />
            </h2>
            <div>
                <button
                    onClick={props.acceptAction}
                    style={
                        props.redStyle
                            ? styles.acceptButtonRedStyle
                            : styles.acceptButtonStyle
                    }
                >
                    {props.acceptTitle}
                </button>
                <button
                    onClick={props.closeModal}
                    style={styles.rejectButtonStyle}
                >
                    {props.rejectTitle}
                </button>
            </div>
        </Modal>
    );
}
