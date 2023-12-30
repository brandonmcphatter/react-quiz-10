import React from 'react';
import {useQuiz} from "../contexts/QuizContext";

function ResetButton() {
    const {dispatch} = useQuiz();
    return (
        <button className='btn btn-ui'
                onClick={()=> dispatch({type: 'restart'})}>
            Restart
        </button>
    );
}

export default ResetButton;