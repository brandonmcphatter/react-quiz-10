import React from 'react';

function FinishScreen({score, totalScore, highScore}) {
    const percentage = Math.ceil( score / totalScore * 100);
    let emoji;
    if (percentage === 100) emoji = '🥇';
    if (percentage >= 90 && percentage < 100) emoji = '🏆';
    if (percentage >= 70 && percentage < 90) emoji = '👍🏾';
    if (percentage >= 50 && percentage < 70) emoji = '🫡';

    return (
        <div>
            <p className='result'>
                <span>{emoji}</span>
                You scored <strong>{score}</strong> out of {totalScore} ({percentage}%)
            </p>
            <p className='highscore'>High Score: <strong>{highScore}</strong></p>
        </div>
    );
}

export default FinishScreen;