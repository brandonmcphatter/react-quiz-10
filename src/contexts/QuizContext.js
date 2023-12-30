import Error from "../components/Error";
import {createContext, useContext, useEffect, useReducer} from "react";

const QuizContext = createContext(undefined);

const SEC_PER_QUESTION = 30;

const initialState = {
    questions: [],
    status: 'loading', // loading, ready, active, finished, error
    index: 0,
    answer: null,
    score: 0,
    highScore: 0,
    secRemaining: 10
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            };
        case 'start':
            return {
                ...state,
                status: 'active',
                secRemaining: state.questions.length * SEC_PER_QUESTION
            };
        case 'newAnswer':
            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                score: action.payload === question.correctOption
                    ? state.score + question.points
                    : state.score
            };
        case 'next':
            return {
                ...state,
                index: state.index + 1,
                answer: null
            };
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highScore: state.score > state.highScore ? state.score : state.highScore
            };
        case 'restart':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready'
            };
        case 'tick':
            return {
                ...state,
                secRemaining: state.secRemaining - 1,
                status: state.secRemaining === 0 ? 'finished' : state.status
            };

        default:
            throw new Error('Action not supported');
    }
}

function QuizProvider({children}) {
    const [
        {
        questions,
        status,
        index,
        answer,
        score,
        highScore,
        secRemaining
    }, dispatch
    ] = useReducer(reducer, initialState, undefined);
    const numbQuestions = questions.length;
    const totalScore = questions.reduce((acc, question) => acc + question.points, 0);

    useEffect(() => {
        fetch('http://localhost:3001/questions')
            .then(res => res.json())
            .then(data => dispatch({type: 'dataReceived', payload: data}))
            .catch(() => dispatch({type: 'dataFailed'}));

    }, []);

    return (
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            score,
            highScore,
            secRemaining,
            numbQuestions,
            totalScore,
            dispatch
        }}>
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}

export {QuizProvider, useQuiz};