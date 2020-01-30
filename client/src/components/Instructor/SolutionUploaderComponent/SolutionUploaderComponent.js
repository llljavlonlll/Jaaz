import React, { useState } from "react";
import axios from "axios";

import "./SolutionUploaderComponent.css";

const SolutionUploader = props => {
    const [filePreview, setFilePreview] = useState(undefined);
    const [file, setFile] = useState("");
    const [inputKey, setInputKey] = useState(Date.now());
    const [description, setDescription] = useState("");

    const handleInputChange = event => {
        setFile(event.target.files[0]);
    };

    const onChangeDescription = event => {
        setDescription(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        props.handleUploadAnimation();

        const data = new FormData();
        data.append("questionName", props.question_image_name);
        data.append("solution", file);
        data.append("description", description);

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        axios
            .post(`/api/solution/${this.props.question_id}`, data, config)
            .then(res => {
                if (res.status === 200) {
                    setFilePreview(null);
                    setFilePreview("");
                    setInputKey(Date.now());
                    setDescription("");

                    props.handleStatusUpdate("Completed");
                }
                props.handleUploadAnimation();
            })
            .catch(err => {
                props.handleUploadAnimation();
            });
    };

    return (
        <div
            className="sol-uploader"
            style={{ maxWidth: "70rem", height: "48rem" }}
        >
            <h3 className="sol-uploader__title">Upload your solution</h3>
            <form onSubmit={onSubmit}>
                <div className="sol-uploader__container">
                    <div className="sol-uploader__input">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                        />
                    </div>
                    <div className="image-preview">
                        <input
                            required
                            type="file"
                            onChange={handleInputChange}
                            name="question"
                            key={inputKey}
                        />
                    </div>
                    <button>Upload Solution</button>
                </div>
            </form>
        </div>
    );
};

export default SolutionUploader;
