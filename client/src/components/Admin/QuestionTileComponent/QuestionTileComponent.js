import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import moment from "moment";
import Axios from "axios";

import ModalComponent from "../../ModalComponent/ModalComponent";

import { MdDeleteForever } from "react-icons/md";
import "./QuestionTileComponent.css";

const QuestionTileComponent = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const history = useHistory();

  const intl = useIntl();

  const { status, _id, qid, description, subject, uploaded_at } = props;

  const deleteQuestion = (id) => {
    Axios.delete(`/api/admin/questions/${id}`).then((res) => {
      props.setQuestions(
        props.questions.filter((question) => question._id !== res.data._id)
      );
      setModalOpen(false);
    });
  };

  const goToQuestionPage = () => {
    history.push(`/question/${_id}`);
  };
  return (
    <tr className="admin-question-tile" onClick={goToQuestionPage}>
      <td>{qid}</td>
      <td>{description ? description : "--"}</td>
      <td>{subject}</td>
      <td
        style={{
          color:
            status === "Completed"
              ? "green"
              : status === "Booked"
              ? "yellow"
              : status === "Rejected"
              ? "red"
              : "white",
        }}
      >
        {status}
      </td>
      <td>{moment(uploaded_at).format("L")}</td>
      <td className="admin-del-btn">
        <button onClick={() => setModalOpen(true)}>
          <MdDeleteForever size="2rem" />
        </button>
      </td>

      <ModalComponent
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        acceptAction={() => deleteQuestion(_id)}
        acceptTitle={intl.formatMessage({
          id: "modal.delete",
          defaultMessage: "Delete",
        })}
        rejectTitle={intl.formatMessage({
          id: "modal.cancel",
          defaultMessage: "Cancel",
        })}
        redStyle={true}
      />

      {
        //             "status": "Booked",
        // "_id": "5e1a044be7df5f100064a1c4",
        // "description": "WiFi Password",
        // "subject": "Math",
        // "owner": "5dbc38e07d62754ae05ba618",
        // "image_name": "e740cd6e-d043-4ce0-944a-0e96a47968e0.jpg",
        // "uploaded_at": "2020-01-11T17:22:19.646Z",
        // "solution": [
        //      "_id": "5e1a0500e7df5f100064a1c8",
        //      "description": "This is a solution",
        //      "image": "solution-ffdc422d-407b-476f-b0c3-ea1da9694846.jpg.jpg",
        //      "solved_by": "5dbc2ea17d62754ae05ba615",
        //      "solved_at": "2020-01-11T17:25:20.397Z"
        // ],
        // "__v": 0,
        // "booked_by": "5dbc2ea17d62754ae05ba615",
        // "chat": "5e3fe1b75df2752058ffb8ca"
      }
    </tr>
  );
};

export default QuestionTileComponent;
