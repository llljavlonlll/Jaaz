import React, { useState, useEffect } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";

import { addQuestion } from "../../../store/actions/questionsActions";
import { updateBalance } from "../../../store/actions/authActions";

import ProgressComponent from "../../ProgressComponent/ProgressComponent";

import "./UploaderComponent.css";

const UploaderComponent = (props) => {
    const [filePreview, setFilePreview] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [inputKey, setInputKey] = useState(Date.now());
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("Math");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadAnimation, setUploadAnimation] = useState(false);

    // useEffect(() => {
    //     const increaseUpload = () => {
    //         setUploadProgress((prev) => prev + 1);
    //     };

    //     setInterval(increaseUpload, 500);
    // }, []);

    const balance = useSelector((state) => state.auth.userData.balance);

    const dispatch = useDispatch();
    const intl = useIntl();

    const handleInputChange = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        if (imageFile) {
            setFilePreview(URL.createObjectURL(imageFile));

            // Decrease image size
            imageCompression(imageFile, {
                maxSizeMB: 1,
            })
                .then((compressedImage) => {
                    // Turn compressed image blob to actual image file
                    setFile(new File([compressedImage], imageFile.name));
                })
                .catch((error) => {
                    console.log(error.message);
                });
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

        // Start spinning animation
        // props.handleUploadAnimation();
        setUploadAnimation(true);

        const data = new FormData();
        data.append("question", file);
        data.append("description", description);
        data.append("subject", subject);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
            // Track the progress of uploading image
            onUploadProgress: function (progressEvent) {
                setUploadProgress(() => {
                    if (
                        ((progressEvent.loaded / file.size) * 100).toFixed(0) <
                        100
                    ) {
                        return (
                            (progressEvent.loaded / file.size) *
                            100
                        ).toFixed(0);
                    }

                    return 100;
                });
            },
        };

        axios
            .post("/api/question/create", data, config)
            .then((res) => {
                if (res.status === 200) {
                    // Reset the form
                    setFilePreview(null);
                    setFile("");
                    setInputKey(Date.now());
                    setDescription("");
                    setSubject("Math");

                    // Deduct 1 credit
                    dispatch(updateBalance(balance - 1));

                    // Add question to the state
                    dispatch(addQuestion(res.data));
                }

                // Stop spinnning animation
                // props.handleUploadAnimation();
                setUploadAnimation(false);
                setUploadProgress(0);
            })
            .catch((err) => {
                console.error(err);
                props.handleUploadAnimation();
            });
    };

    return (
        <div className="question-uploader">
            {uploadAnimation && (
                <div className="question-uploader__progress">
                    <ProgressComponent value={uploadProgress} />
                </div>
            )}
            {/*<div className="question-uploader__progress">
                <ProgressComponent value={uploadProgress} />
            </div>*/}
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
                                    id: "general.math",
                                    defaultMessage: "Math",
                                })}
                            </option>
                            <option value="English">
                                {intl.formatMessage({
                                    id: "general.english",
                                    defaultMessage: "English",
                                })}
                            </option>
                            <option value="History">
                                {intl.formatMessage({
                                    id: "general.history",
                                    defaultMessage: "History",
                                })}
                            </option>
                            <option value="Physics">
                                {intl.formatMessage({
                                    id: "general.physics",
                                    defaultMessage: "Physics",
                                })}
                            </option>
                            <option value="Chemistry">
                                {intl.formatMessage({
                                    id: "general.chemistry",
                                    defaultMessage: "Chemistry",
                                })}
                            </option>
                            <option value="Computer Science">
                                {intl.formatMessage({
                                    id: "general.computer",
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
