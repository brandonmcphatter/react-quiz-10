import React, {useEffect} from 'react';
import {useQuiz} from "../contexts/QuizContext";

function Timer() {
    const {secRemaining: secRem, dispatch} = useQuiz();
    const minutes = Math.floor(secRem / 60);
    const seconds = secRem % 60;
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({type: 'tick'});
        }, 1000);
        return () => clearInterval(timer);
    }, [dispatch]);
    return (
        <div className='timer'>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
}

export default Timer;