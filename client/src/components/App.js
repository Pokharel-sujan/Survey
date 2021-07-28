import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // helpers for navigating around Dom, other is (native and core-react-Library)
import { connect } from 'react-redux';
import * as actions from '../actions';

// const Header =() =><h2>Header</h2> (//dummy component for down content)
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

//const Landing =() =><h2>Landing</h2>

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/"         component={Landing} />
						<Route exact path="/surveys"  component={Dashboard} />
						<Route       path="/surveys/new"    component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
// inside of Browser Router there is Route

export default connect(
	null,
	actions
)(App); //use of connect
// hello this is the change