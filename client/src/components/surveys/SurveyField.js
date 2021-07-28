//SurveyField contains logic to render a single label and text input
//{...input } ===equal to onBlur= {input.onBlur}; onblur is one of the event handler of input

import React from 'react';

export default ({input, label, meta:{error, touched}} )=>{

    return(
        <div>
            <label>{label}</label>
            <input {...input}  style ={{marginBottom:'5px'}}/>
            <div className = "red-text" style={{marginBottom: '20px'}}>
            {touched && error}
            </div>

        </div>
    );
};
//{input, label, meta:{error, touched}}
// hello this is the change