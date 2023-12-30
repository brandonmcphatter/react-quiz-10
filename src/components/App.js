import '../App.css';
import Header from "./Header";
import Main from './Main';
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
import {useQuiz} from "../contexts/QuizContext";

export default function App() {
    const {index, status, questions} = useQuiz();



    return (

            <div className="app">
                <Header/>
                <Main>
                    {status === 'loading' && <Loader/>}
                    {status === 'error' && <Error/>}
                    {status === 'ready' && <StartScreen/>}
                    {status === 'active' &&
                        <>
                            <Progress/>
                            <Question question={questions[index]}/>

                            <Footer>
                                <Timer/>
                                <NextButton index={index}/>
                            </Footer>
                        </>}

                    {status === 'finished' &&
                        <>
                            <FinishScreen/>

                            <ResetButton/>
                        </>}

                </Main>
            </div>

    );
}



