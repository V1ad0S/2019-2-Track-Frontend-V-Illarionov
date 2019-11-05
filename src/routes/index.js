import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AppContainer from '../containers/AppContainer';

export const history = createBrowserHistory();

function Routes() {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/" component={AppContainer} />
			</Switch>
		</Router>
	);
}

export default Routes;
