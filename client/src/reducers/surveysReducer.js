import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
}

// we have to wire this to comine reducer call in index.js of reducer
// hello this is the change