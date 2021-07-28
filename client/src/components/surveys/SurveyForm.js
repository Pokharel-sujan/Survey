// //SurveyForm shows a  form for a user to add input
// import _ from 'lodash';
// import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form'; // one specific function {}
// import SurveyField from './SurveyField';
// import { Link } from 'react-router-dom';
// import validateEmails from '../../utils/validateEmail';
// import formField from './formField';

// const formFields = [
// 	{ label: 'Survey Title', name: 'title' },
// 	{ label: 'Subject Line', name: 'subject' },
// 	{ label: 'Email Body', name: 'body' },
// 	{ label: 'Recipient List', name: 'recipients' },
// ];

// class SurveyForm extends Component {
// 	renderFields() {
// 		// helper function
// 		return (
// 			<div>
// 				<Field label="Survey Title" type="text" name="title"   component={SurveyField} />
// 				<Field label="Subject Line" type="text" name="subject" component={SurveyField} />
// 				<Field label="Email"        type="text" name="body"    component={SurveyField} />
// 				<Field label="Recipients list" type="text" name="emails" component={SurveyField} />
// 			</div>
// 		);
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
// 					{this.renderFields()}
// 					<Link to="/surveys" className="red btn-flat white-text">
// 						Cancel
// 					</Link>
// 					<button className="teal btn-flat right white-text" type="submit">
// 						Next
// 						<i className="material-icons right">done</i>
// 					</button>
// 				</form>
// 			</div>
// 		);
// 	}
// }
// function validate(values) {
// 	const errors = {};
// 	errors.recipients = validateEmails(values.recipients || '');

// 	_.each(formFields, ({ name }) => {
// 		if (!values[name]) {
// 			errors[name] = 'you must provide a value';
// 		}
// 	});

// 	/*if (!values.title){
//         errors.title = 'You must provide a title';
//     }
//     if (!values.subject){
//         errors.title = 'You must provide a subject';
//     }
//     if (!values.body){
//         errors.title = 'You must provide a body';
//     }
//     if (!values.email){
//         errors.title = 'You must provide a email';
//     } */

// 	return errors;
// }

// export default reduxForm({
// 	validate,
// 	form: 'surveyForm',
// 	destroyOnUnMount: false, // true by default
// })(SurveyForm); // redux form helper  takes 1 parameter

// // this will initialize and configures surveyform.  so we write the name of form afterwards



//---------------------------------------here----------------------------------------------//


//SurveyForm shows a  form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // one specific function {}
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';



class SurveyForm extends Component {
	renderFields() {
		// helper function
		return _.map(formFields, ({label, name}) =>{
			return (
				<Field
				Key ={name}
				component={SurveyField}
				type={"text"}
				label={label}
				name={name} />
			);
			});
		}



	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button className="teal btn-flat right white-text" type="submit">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}
function validate(values) {
	const errors = {};
	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'you must provide a value';
		}
	});

	/*if (!values.title){
        errors.title = 'You must provide a title';
    }
    if (!values.subject){
        errors.title = 'You must provide a subject';
    }
    if (!values.body){
        errors.title = 'You must provide a body';
    }
    if (!values.email){
        errors.title = 'You must provide a email';
    } */

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnMount: false, // true by default
})(SurveyForm); // redux form helper  takes 1 parameter

// this will initialize and configures surveyform.  so we write the name of form afterwards
// hello this is the change