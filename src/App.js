import './App.css';
import Header from "./Header";
import Main from './Main';
import {useEffect, useReducer} from "react";

const initialState = {
    questions: [],
    status: 'loading', // loading, ready, active, finished, error
    currentQuestion: 0,
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
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);

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
                <p>1/15</p>
                <p>{state.questions[1].question}</p>
            </Main>


        </div>
    );
}

