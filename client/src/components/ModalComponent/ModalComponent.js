/*
    props: {
        isOpen: Boolean (Modal state) (required)
        closeModal: function (Function that closes modal) (required)
        acceptAction: function (Function that tells what to do on modal close) (required)
        redStyle: Boolean (True if you want action button style to be red. default 'False')
        acceptTitle: String (String that will show on accept button. Default: 'OK')
        rejectTitle: String (String that will show on cancel button. Default: 'Cancel)
    }

*/

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
                    {props.acceptTitle || "Ok"}
                </button>
                <button
                    onClick={props.closeModal}
                    style={styles.rejectButtonStyle}
                >
                    {props.rejectTitle || "Cancel"}
                </button>
            </div>
        </Modal>
    );
}
