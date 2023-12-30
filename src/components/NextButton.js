import React from 'react';
import {useQuiz} from "../contexts/QuizContext";

function NextButton({index}) {
    const {dispatch, answer, numbQuestions} = useQuiz();
    if (answer === null) return null;
    if (index < numbQuestions - 1) return (
        <button className='btn btn-ui'
        onClick={()=> dispatch({type: 'next'})}>
            Next
        </button>
    );
    return (
        <button className='btn btn-ui'
        onClick={()=> dispatch({type: 'finish'})}>
            Finish
        </button>
    );
}

export default NextButton;