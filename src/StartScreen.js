
function StartScreen({numbQuestions}) {
    return (
        <div className='start'>
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numbQuestions} questions to test your React mastery 🧠</h3>
            <button className='btn btn-ui'>Let's Start!</button>
        </div>
    );
}

export default StartScreen;