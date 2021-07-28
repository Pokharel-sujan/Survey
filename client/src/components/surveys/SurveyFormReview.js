//SurveyFormReview shows  users their form inputs for review

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; // some components are inaccessible so we use this lib
import * as actions from '../../actions';

// onCancel  and others are the props we bring from another component
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {

		return (
			<div key={name}>
				<label>{label}</label>
				<div> {formValues[name]}</div>
			</div>
		);
	});
	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button className="yellow darken-3  white-txt btn-flat" onClick={onCancel}>
				Back
			</button>

			<button onClick={() => submitSurvey(formValues, history)} className="green btn-flat right white-txt">
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);

	//mathi Send Survey  button ma onclick we call action creater i.e submitSurvey,
	// with prop named as formValues (we can name ourself  in function mapStateToProps) but has to be sent as props to above component
	//SubmitSurvey is action creater but instantly send na-huna ko lagi chai we use arrow function
	// ani last ma submitSurvey chai prop ko form ma pass vako 6 so, we have to put it as prop in our existing component i.eSurveyFormReview
};
// it is called mapStateToProps, it is taking our redux state and then transferring into props and send them down into components

//  To take the things from the store
function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

// When we are using the connect function, mapstatetoprops is  used
export default connect(
	mapStateToProps,
	actions
)(withRouter(SurveyFormReview));

// connect helper jun ma garna parnee ho tsma garnee  ani action creater 2nd parameter garera  pass garnee
// hello this is the change