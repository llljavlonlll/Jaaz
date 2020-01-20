import React, { useState } from "react";
import axios from "axios";
import { addQuestion } from "../../store/actions/questionsActions";
import { useDispatch, useSelector } from "react-redux";
import "./UploaderComponent.css";
import { updateBalance } from "../../store/actions/authActions";

const UploaderComponent = props => {
    const [filePreview, setFilePreview] = useState(undefined);
    const [file, setFile] = useState("");
    const [inputKey, setInputKey] = useState(Date.now());
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("Math");

    const balance = useSelector(state => state.auth.userData.balance);

    const dispatch = useDispatch();

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
        if (event.target.value.length <= 100) {
            setDescription(event.target.value);
        }
    };

    const onSubmit = event => {
        event.preventDefault();
        props.handleUploadAnimation();

        const data = new FormData();
        data.append("question", file);
        data.append("description", description);
        data.append("subject", subject);

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        axios
            .post("/api/question/create", data, config)
            .then(res => {
                if (res.status === 200) {
                    setFilePreview(null);
                    setFile("");
                    setInputKey(Date.now());
                    setDescription("");
                    setSubject("Math");

                    dispatch(updateBalance(balance - 3000));

                    dispatch(addQuestion(res.data));
                }
                props.handleUploadAnimation();
            })
            .catch(err => {
                console.error(err);
                props.handleUploadAnimation();
            });
    };

    return (
        <div className="question-uploader">
            <h3 className="question-uploader__title">Upload your question</h3>
            <form onSubmit={onSubmit}>
                <div className="question-uploader__container">
                    <div className="question-uploader__input">
                        <label htmlFor="description">
                            Description{" "}
                            <span style={{ fontSize: "1rem" }}>
                                (max. 100 characters)
                            </span>
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
                        <label htmlFor="subject">Subject</label>
                        <select
                            value={subject}
                            onChange={event => setSubject(event.target.value)}
                            name="subject"
                            id="subject"
                        >
                            <option value="Math">Math</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
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

                    {balance < 3000 ? (
                        <button
                            disabled
                            className="question-uploader__container__button disabled"
                        >
                            Low balance!
                        </button>
                    ) : (
                        <button className="question-uploader__container__button">
                            Upload Question
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UploaderComponent;
