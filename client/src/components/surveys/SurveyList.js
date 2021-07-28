//we want this to wire this up to redux as we have to call action creater to fetch the list of surveys

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	//helper method

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="card darken 1" key={survey._id}>
					<div className="card-content ">
						<span className="card-title">{survey.title} </span>
						<p>{survey.body}</p>
						<p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
					</div>
					<div className="card-action">
						<a> Yes: {survey.yes}</a>
						<a> No: {survey.no}</a>
					</div>
				</div>
			);
		});
	}
	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps(state) {
	return { surveys: state.surveys };
	// in index.js under actions there is combine reducer and we kept it under surveys
}

/*es6 refactor
function mapStateToProps({surveys}){
    return { surveys};

    // in index.js there is combine reducer and we kept it under surveys
}*/

export default connect(
	mapStateToProps,
	{ fetchSurveys }
)(SurveyList);
// hello this is the change