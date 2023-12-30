import React from 'react';
import {useQuiz} from "../contexts/QuizContext";

function Progress() {
    const {numbQuestions, index, score, totalScore, answer} = useQuiz();
    return (
        <header className='progress'>
            <progress value={index + Number(answer !== null)} max={numbQuestions}/>
            <p>Question <strong>{index+1}</strong> / {numbQuestions}</p>
            <p><strong>{score}</strong> / {totalScore} points</p>
        </header>
    );
}

export default Progress;