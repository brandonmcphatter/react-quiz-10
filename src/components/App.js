import '../App.css';
import Header from "./Header";
import Main from './Main';
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import ResetButton from "./ResetButton";
import Footer from "./Footer";
import Timer from "./Timer";

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

export default function App() {
    const [{
        questions,
        status,
        index,
        answer,
        score,
        highScore,
        secRemaining
    }, dispatch] = useReducer(reducer, initialState, undefined);
    const numbQuestions = questions.length;
    const totalScore = questions.reduce((acc, question) => acc + question.points, 0);

    useEffect(() => {
        fetch('http://localhost:3001/questions')
            .then(res => res.json())
            .then(data => dispatch({type: 'dataReceived', payload: data}))
            .catch(() => dispatch({type: 'dataFailed'}));

    }, []);

    return (
        <div className="app">
            <Header/>

            <Main>
                {status === 'loading' && <Loader/>}

                {status === 'error' && <Error/>}

                {status === 'ready' && <StartScreen numbQuestions={numbQuestions} dispatch={dispatch}
                />}

                {status === 'active' &&
                    <>
                        <Progress numbQuestions={numbQuestions}
                                  index={index}
                                  score={score}
                                  answer={answer}
                                  totalScore={totalScore}/>
                        <Question question={questions[index]}
                                  dispatch={dispatch}
                                  answer={answer}/>

                        <Footer>
                            <Timer dispatch={dispatch}
                                   secRem={secRemaining}/>
                            <NextButton answer={answer}
                                        dispatch={dispatch}
                                        index={index}
                                        numbQuestions={numbQuestions}/>
                        </Footer>
                    </>}

                {status === 'finished' &&
                    <>
                        <FinishScreen score={score}
                                      totalScore={totalScore}
                                      dispatch={dispatch}
                                      highScore={highScore}/>

                        <ResetButton dispatch={dispatch}/>
                    </>}

            </Main>


        </div>
    );
}



