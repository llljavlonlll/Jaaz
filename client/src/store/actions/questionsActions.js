import { LOAD_QUESTIONS, ADD_QUESTION, FILTER_QUESTIONS } from "./types";

export const loadQuestions = (questions = []) => {
    return (dispatch, getState) => {
        const userData = getState().auth.userData;

        // Check each question if it has new messages in its chat field
        // If yes, then add "newMessages" field to the question
        const qidWithNewMessages = questions
            .filter(question => question.chat)
            .filter(questionWithChat => {
                const alienMessages = questionWithChat.chat.messages.filter(
                    message => message.owner_uid !== userData.uid
                );
                return alienMessages.some(message => !message.isSeen);
            })
            .map(questionWithNewMessage => questionWithNewMessage.qid);

        const modifiedQuestions = questions.map(question => {
            if (qidWithNewMessages.includes(question.qid)) {
                return {
                    ...question,
                    hasNewMessage: true
                };
            } else {
                return {
                    ...question,
                    hasNewMessage: false
                };
            }
        });
        dispatch({
            type: LOAD_QUESTIONS,
            questions: modifiedQuestions
        });
    };
};

export const addQuestion = question => ({
    type: ADD_QUESTION,
    question
});

export const filterQuestions = subject => ({
    type: FILTER_QUESTIONS,
    payload: subject
});
