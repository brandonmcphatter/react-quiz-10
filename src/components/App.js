import '../App.css';
import Header from "./Header";
import Main from './Main';
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
    questions: [],
    status: 'loading', // loading, ready, active, finished, error
    index: 0,
    answers: [],
    score: 0
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
                status: 'active'
            };
    }
}

export default function App() {
    const [{questions, status, index}, dispatch] = useReducer(reducer, initialState, undefined);
    const numbQuestions = questions.length;

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
                {status === 'ready' && <StartScreen
                    numbQuestions={numbQuestions}
                    dispatch={dispatch}
                />}
                {status === 'active' && <Question question={questions[index]}/>}

            </Main>


        </div>
    );
}



