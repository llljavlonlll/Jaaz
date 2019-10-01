import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

export default class QuestionPage extends Component {
    state = {
        status: "",
        uploaded_at: "",
        description: "",
        subject: "",
        owner: "",
        image_name: "",
        isLoading: true
    };
    componentDidMount() {
        axios
            .get(`api/question/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    status: res.status,
                    uploaded_at: res.data.uploaded_at,
                    description: res.data.description,
                    subject: res.data.subject,
                    owner: res.data.owner,
                    image_name: res.data.image_name,
                    isLoading: false
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        const {
            status,
            uploaded_at,
            description,
            subject,
            owner,
            image_name
        } = this.state;

        if (this.state.isLoading) {
            return <ReactLoading color={"#8357c5"} type={"spin"} />;
        }

        return (
            <div>
                <p>Question details</p>
                <ul>
                    <li>{status}</li>
                    <li>{uploaded_at}</li>
                    <li>{description}</li>
                    <li>{subject}</li>
                    <li>{owner}</li>
                    <li>
                        <img
                            src={`http://127.0.0.1:5001/${image_name}`}
                            alt="Question"
                            width="200"
                        />
                    </li>
                </ul>
                <p>Question solution</p>
            </div>
        );
    }
}
