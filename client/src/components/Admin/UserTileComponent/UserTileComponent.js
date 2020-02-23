import React, { useState } from "react";
import Axios from "axios";
import { useIntl } from "react-intl";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";

import ModalComponent from "../../ModalComponent/ModalComponent";
import "./UserTileComponent.css";

const UserTileComponent = props => {
    const [modalOpen, setModalOpen] = useState(false);

    const intl = useIntl();

    const {
        isVerified,
        _id,
        uid,
        created,
        balance,
        name,
        email,
        category,
        tokens
    } = props;

    const deleteUser = id => {
        Axios.delete(`/api/admin/user/${id}`).then(res => {
            props.setUsers(
                props.users.filter(user => user._id !== res.data._id)
            );
            setModalOpen(false);
        });
    };
    return (
        <tr className="admin-user-tile">
            <td>{uid}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{category}</td>
            <td style={{ color: isVerified ? "green" : "red" }}>
                {isVerified.toString()}
            </td>
            <td>{moment(created).format("L")}</td>
            <td>{balance}</td>
            {/*<td>Tokens: {tokens}</td>*/}
            <td className="admin-del-btn">
                <button onClick={() => setModalOpen(true)}>
                    <MdDeleteForever size="2rem" />
                </button>
            </td>
            <ModalComponent
                isOpen={modalOpen}
                closeModal={() => setModalOpen(false)}
                acceptAction={() => deleteUser(_id)}
                acceptTitle={intl.formatMessage({
                    id: "modal.delete",
                    defaultMessage: "Delete"
                })}
                rejectTitle={intl.formatMessage({
                    id: "modal.cancel",
                    defaultMessage: "Cancel"
                })}
                redStyle={true}
            />

            {
                //         "isVerified": false,
                // "balance": 0,
                // "_id": "5dbc2ea17d62754ae05ba615",
                // "name": "Test Teacher",
                // "email": "test_teacher@jbtruckers.com",
                // "password": "$2b$08$9yPbAeH3E3nuK0pQBFRQ4urbRFwiK6CK4Fqki8HSD1NOrUjqm2PjK",
                // "category": "instructor",
                // "tokens": [
                //     {
                //         "_id": "5dbc3aaa7d62754ae05ba621",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciJ9LCJpYXQiOjE1NzI2MTY4NzR9.F1N2pRhrK3fT222bvc2pT_nHtf1lM2rCQ_lA13T7YeE"
                //     },
                //     {
                //         "_id": "5dc6fede7d62754ae05ba622",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciJ9LCJpYXQiOjE1NzMzMjI0NjJ9.WXL4fUv0NUYvdkA3NXqKSYRx9yVVYTm2dCr9IwXaB5g"
                //     },
                //     {
                //         "_id": "5dd569ac7d62754ae05ba629",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciJ9LCJpYXQiOjE1NzQyNjczMDh9.R7g9LCFcXKOBsUY0Eo5KO0hocm0-ECo7khgVqlU4mM8"
                //     },
                //     {
                //         "_id": "5de3b3157d62754ae05ba62b",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciJ9LCJpYXQiOjE1NzUyMDM2MDV9.klxI9gpJaCeMkePZMMoHUdHbIM75tbcj7dH2_TT8kdM"
                //     },
                //     {
                //         "_id": "5de92e707d62754ae05ba631",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciJ9LCJpYXQiOjE1NzU1NjI4NjR9.W7sUPrGvXu9OM1mtxZ8Z2ycDg0kbTFLBgZ1IXmgsXQY"
                //     },
                //     {
                //         "_id": "5e1a0a47e7df5f100064a1d6",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjB9LCJpYXQiOjE1Nzg3NjQ4NzF9.KXlDISxWQXpH_YE3iAHgGsc8M9r5ltYgvCH8WyHK9kY"
                //     },
                //     {
                //         "_id": "5e3446a5670353348040775e",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZWFjaGVyIFRlc3QiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjB9LCJpYXQiOjE1ODA0ODQyNjF9.IdK1lbE8xdyi2rql5oP_dTHr40ZEuJXYn3aFOHg94LM"
                //     },
                //     {
                //         "_id": "5e34625af3b44f1908e98a6c",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjYwMDB9LCJpYXQiOjE1ODA0OTEzNTR9.KHtuwJHHGTJXH0OfwacEjuMbncwP5vvf5EoeIE_9U6A"
                //     },
                //     {
                //         "_id": "5e3465a62371b24a98b2fcca",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjYwMDB9LCJpYXQiOjE1ODA0OTIxOTh9.rTULeLoARV76aQIQ2lGnLY3WQRIP8Mj87ArydMRYV-0"
                //     },
                //     {
                //         "_id": "5e39895a71d1a73f0cc5546e",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjB9LCJpYXQiOjE1ODA4MjkwMTh9.eW4_T2RbG_Z5i_s_P_cAU8RXhu8mjR-B54WMFqcm4ZI"
                //     },
                //     {
                //         "_id": "5e3c125d70c34755d6577938",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjB9LCJpYXQiOjE1ODA5OTUxNjV9.m45YO-T2wKE2-943TrUaUaIdFFR92zqsAiNkP8MxPJw"
                //     },
                //     {
                //         "_id": "5e4000c3b40cd4221c41bdeb",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjB9LCJpYXQiOjE1ODEyNTI4MDN9.xm_A_KrGrDBH3F7zyEHXnixY2ijnT3zY1yEJQNR8DH8"
                //     },
                //     {
                //         "_id": "5e4adce870c34755d6577968",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjB9LCJpYXQiOjE1ODE5NjQ1MjB9.sExglkhBv63S097xdBrxkFra5fcedh-5zuiKxzER-g4"
                //     },
                //     {
                //         "_id": "5e4d25b20519412ea49470cd",
                //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJ1c2VyIjp7Im5hbWUiOiJUZXN0IFRlYWNoZXIiLCJlbWFpbCI6InRlc3RfdGVhY2hlckBqYnRydWNrZXJzLmNvbSIsImNhdGVnb3J5IjoiaW5zdHJ1Y3RvciIsImJhbGFuY2UiOjB9LCJpYXQiOjE1ODIxMTQyMjZ9.GI3X7VW_shUVLdw1yA7tAFCo74-_Xt2AIvPcNVLhrDc"
                //     }
                // ],
                // "activationHash": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjMmVhMTdkNjI3NTRhZTA1YmE2MTUiLCJpYXQiOjE1NzI2MTM3OTN9.7s95QrJTU4Un7BD-J_xkQNlF0sIVpvOV9iWadPaoo54",
                // "__v": 257
            }
        </tr>
    );
};

export default UserTileComponent;
