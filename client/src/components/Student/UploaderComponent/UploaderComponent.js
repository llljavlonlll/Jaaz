import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";

import { addQuestion } from "../../../store/actions/questionsActions";
import { updateBalance } from "../../../store/actions/authActions";

import "./UploaderComponent.css";

const UploaderComponent = (props) => {
    const [filePreview, setFilePreview] = useState(undefined);
    const [file, setFile] = useState("");
    const [inputKey, setInputKey] = useState(Date.now());
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("Math");

    const balance = useSelector((state) => state.auth.userData.balance);

    const dispatch = useDispatch();
    const intl = useIntl();

    const handleInputChange = (event) => {
        if (event.target.files[0]) {
            setFilePreview(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
        } else {
            setFilePreview(undefined);
            setFile("");
        }
    };

    const onChangeDescription = (event) => {
        if (event.target.value.length <= 100) {
            setDescription(event.target.value);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        props.handleUploadAnimation();

        const data = new FormData();
        data.append("question", file);
        data.append("description", description);
        data.append("subject", subject);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        axios
            .post("/api/question/create", data, config)
            .then((res) => {
                if (res.status === 200) {
                    setFilePreview(null);
                    setFile("");
                    setInputKey(Date.now());
                    setDescription("");
                    setSubject("Math");

                    dispatch(updateBalance(balance - 1));

                    dispatch(addQuestion(res.data));
                }
                props.handleUploadAnimation();
            })
            .catch((err) => {
                console.error(err);
                props.handleUploadAnimation();
            });
    };

    return (
        <div className="question-uploader">
            <h3 className="question-uploader__title">
                <FormattedMessage
                    id="student.upload.title"
                    defaultMessage="Upload your question"
                />
            </h3>
            <form onSubmit={onSubmit}>
                <div className="question-uploader__container">
                    <div className="question-uploader__input">
                        <label htmlFor="description">
                            <FormattedHTMLMessage
                                id="student.upload.description"
                                defaultMessage="Description (max. 100 characters)"
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
                    <div className="question-uploader__input">
                        <label htmlFor="subject">
                            <FormattedMessage
                                id="student.upload.subject"
                                defaultMessage="Subject"
                            />
                        </label>
                        <select
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            name="subject"
                            id="subject"
                        >
                            <option value="Math">
                                {intl.formatMessage({
                                    id: "math",
                                    defaultMessage: "Math",
                                })}
                            </option>
                            <option value="English">
                                {intl.formatMessage({
                                    id: "english",
                                    defaultMessage: "English",
                                })}
                            </option>
                            <option value="History">
                                {intl.formatMessage({
                                    id: "history",
                                    defaultMessage: "History",
                                })}
                            </option>
                            <option value="Physics">
                                {intl.formatMessage({
                                    id: "physics",
                                    defaultMessage: "Physics",
                                })}
                            </option>
                            <option value="Chemistry">
                                {intl.formatMessage({
                                    id: "chemistry",
                                    defaultMessage: "Chemistry",
                                })}
                            </option>
                            <option value="Computer Science">
                                {intl.formatMessage({
                                    id: "computer",
                                    defaultMessage: "Computer Science",
                                })}
                            </option>
                        </select>
                    </div>
                    <div className="image-preview">
                        <input
                            required
                            type="file"
                            onChange={handleInputChange}
                            name="question"
                            key={inputKey}
                        />
                        {filePreview && (
                            <div className="image-preview__image-container">
                                <img
                                    src={filePreview}
                                    alt="Uploaded question"
                                />
                            </div>
                        )}
                    </div>

                    {balance === 0 ? (
                        <button
                            disabled
                            className="question-uploader__container__button disabled"
                        >
                            <FormattedMessage
                                id="student.upload.button.low"
                                defaultMessage="Low balance!"
                            />
                        </button>
                    ) : (
                        <button className="question-uploader__container__button">
                            <FormattedMessage
                                id="student.upload.button.active"
                                defaultMessage="Upload Question"
                            />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UploaderComponent;
