import React from 'react';

function NextButton({dispatch, answer}) {
    if (answer === null) return null;
    return (
        <button className='btn btn-ui'
        onClick={()=> dispatch({type: 'next'})}>
            Next
        </button>
    );
}

export default NextButton;