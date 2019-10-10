import React, { Component } from "react";
import axios from "axios";
export default class SolutionUploader extends Component {
    state = {
        filePreview: undefined,
        file: "",
        inputKey: Date.now(), // this value is to force file input field to re-render
        description: ""
    };

    handleInputChange = event => {
        this.setState({
            filePreview: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
        });
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        const { file, description } = this.state;

        const data = new FormData();
        data.append("questionName", this.props.question_image_name);
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
                    this.setState({
                        filePreview: null,
                        file: "",
                        inputKey: Date.now(), // Update key to force re-render
                        description: ""
                    });
                    this.props.handleStatusUpdate("Completed");
                    // this.props.dispatch(addQuestion(res.data));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    render() {
        return (
            <div className="question-uploader">
                <h3 className="question-uploader__title">
                    Upload your solution
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="question-uploader__container">
                        <div className="login-component__form__item">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="image-preview">
                            <input
                                type="file"
                                onChange={this.handleInputChange}
                                name="question"
                                key={this.state.inputKey}
                            />
                            {this.state.filePreview && (
                                <img
                                    src={this.state.filePreview}
                                    alt="Uploaded question"
                                />
                            )}
                        </div>
                        <button>Upload Solution</button>
                    </div>
                </form>
            </div>
        );
    }
}
