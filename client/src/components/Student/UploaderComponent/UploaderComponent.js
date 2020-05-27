import React, { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import { MdClear } from "react-icons/md";
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
    const [compressionProgress, setCompressionProgress] = useState(0);
    const [uploadAnimation, setUploadAnimation] = useState(false);
    const [compressionLoading, setCompressionLoading] = useState(false);

    // useEffect(() => {
    //     const increaseUpload = () => {
    //         setUploadProgress((prev) => prev + 1);
    //     };

    //     setInterval(increaseUpload, 500);
    // }, []);

    const balance = useSelector((state) => state.auth.userData.balance);

    const dispatch = useDispatch();
    const intl = useIntl();

    const clearImage = () => {
        setFile(undefined);
        setFilePreview(undefined);
    };

    const handleInputChange = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);

        if (!imageFile) {
            setFilePreview(undefined);
            setFile("");
            return;
        }

        if (imageFile && imageFile.size > 1000000) {
            // Reset compression progress
            setCompressionProgress(0);
            setCompressionLoading(true);
            setFile(imageFile);

            // Decrease image size
            imageCompression(imageFile, {
                maxSizeMB: 1,
                onProgress: function (progress) {
                    setCompressionProgress((prevState) => {
                        if (prevState < progress) {
                            return progress;
                        }

                        return prevState;
                    });
                },
            })
                .then((compressedImage) => {
                    // Turn compressed image blob to actual image file
                    const file = new File([compressedImage], imageFile.name);

                    // Setting preview and file states
                    setFilePreview(URL.createObjectURL(file));
                    setFile(file);
                    setCompressionLoading(false);
                    document
                        .getElementById("question-uploader")
                        .scrollIntoView({
                            behavior: "smooth",
                        });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            setFilePreview(URL.createObjectURL(imageFile));
            setFile(imageFile);
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
        <div className="question-uploader" id="question-uploader">
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
            <form id="upload-form" onSubmit={onSubmit}>
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
                        {!file && (
                            <input
                                required
                                type="file"
                                onChange={handleInputChange}
                                name="question"
                                key={inputKey}
                                id="upload-image"
                            />
                        )}
                        {compressionLoading && (
                            <div className="image-preview__compression">
                                <ProgressComponent
                                    value={compressionProgress}
                                />
                            </div>
                        )}
                        {filePreview && (
                            <div className="image-preview__image-container">
                                <div
                                    className="image-preview__clear-image"
                                    onClick={clearImage}
                                >
                                    <MdClear color="white" size="1.2em" />
                                </div>
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
                        <button
                            className={`question-uploader__container__button${
                                compressionLoading ? " disabled" : ""
                            }`}
                            disabled={compressionLoading}
                        >
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
