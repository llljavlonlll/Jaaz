import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./AdminQuestionPage.css";
import Axios from "axios";

export default function AdminQuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState();

  useEffect(() => {
    Axios.get(`/api/admin/questions/${id}`).then((res) => {
      // console.log(res.data)
      setQuestion(res.data);
    });
  }, [id]);
  return (
    <div>
      <h1>Admin question page</h1>
      <h3>Question ID : {id}</h3>
      {question && (
        <div>
          <div>Status: {question.status}</div>
          <div>ID: {question._id}</div>
          <div>Description: {question.description}</div>
          <div>Subject: {question.subject}</div>
          <div>Owner: {question.owner}</div>
          <div>Image URL: {question.image_name}</div>
          <div>Upload time: {question.uploaded_at}</div>
          <img
            src={`/images/questions/${question.image_name}`}
            alt="Question"
          />
        </div>
      )}
    </div>
  );
}
