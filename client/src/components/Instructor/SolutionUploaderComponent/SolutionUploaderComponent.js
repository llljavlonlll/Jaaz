import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import "./SolutionUploaderComponent.css";

const SolutionUploader = props => {
    const [filePreview, setFilePreview] = useState(undefined);
    const [file, setFile] = useState("");
    const [inputKey, setInputKey] = useState(Date.now());
    const [description, setDescription] = useState("");

    const handleInputChange = event => {
        if (event.target.files[0]) {
            setFilePreview(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
        } else {
            setFilePreview(undefined);
            setFile("");
        }
    };

    const onChangeDescription = event => {
        setDescription(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        props.handleUploadAnimation();

        const data = new FormData();
        data.append("questionName", props.question_image_name);
        data.append("description", description);
        data.append("solution", file);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        axios
            .post(`/api/solution/${props.question_id}`, data, config)
            .then(res => {
                if (res.status === 200) {
                    setFilePreview(null);
                    setFilePreview("");
                    setInputKey(Date.now());
                    setDescription("");

                    props.handleReceiveSolution(res.data.solution);
                    props.handleStatusUpdate("Completed");
                }
                props.handleUploadAnimation();
            })
            .catch(err => {
                props.handleUploadAnimation();
            });
    };

    return (
        <div className="sol-uploader" style={{ maxWidth: "70rem" }}>
            <h3 className="sol-uploader__title">
                <FormattedMessage
                    id="teacher.upload.title"
                    defaultMessage="Upload your solution"
                />
            </h3>
            <form onSubmit={onSubmit}>
                <div className="sol-uploader__container">
                    <div className="sol-uploader__input">
                        <label htmlFor="description">
                            <FormattedMessage
                                id="teacher.upload.description"
                                defaultMessage="Description"
                            />
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                        />
                    </div>
                    <div className="sol-uploader__image-preview">
                        <input
                            required
                            type="file"
                            onChange={handleInputChange}
                            name="question"
                            key={inputKey}
                        />
                        <div className="sol-uploader__thumbnail">
                            <IconContext.Provider
                                value={{
                                    size: "4rem",
                                    className: "sol-uploader__thumbnail__icon"
                                }}
                            >
                                <div>
                                    <FaUpload />
                                </div>
                            </IconContext.Provider>
                            <div className="sol-uploader__thumbnail__text">
                                <FormattedMessage
                                    id="teacher.upload.msg"
                                    defaultMessage="Upload a solution image"
                                />
                            </div>
                        </div>
                    </div>
                    {filePreview && (
                        <div className="sol-uploader__image-preview__image-container">
                            <img src={filePreview} alt="Uploaded question" />
                        </div>
                    )}
                    <button>
                        <FormattedMessage
                            id="teacher.upload.button"
                            defaultMessage="Upload Solution"
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SolutionUploader;
