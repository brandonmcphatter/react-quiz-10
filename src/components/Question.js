import Options from "./Options";
import {useQuiz} from "../contexts/QuizContext";

function Question({question}) {
    const { dispatch, answer} = useQuiz();
    return (
        <div className=''>
            <h4>{question.question}</h4>
            <Options question={question}
                     dispatch={dispatch}
                     answer={answer}/>

        </div>
    );
}

export default Question;