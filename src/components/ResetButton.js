import React from 'react';

function ResetButton({dispatch}) {
    return (
        <button className='btn btn-ui'
                onClick={()=> dispatch({type: 'restart'})}>
            Restart
        </button>
    );
}

export default ResetButton;