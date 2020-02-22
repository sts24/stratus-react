import React from "react";
import { Store } from "./Store";
import GetData from "./GetData";

import Heading from "./compontents/heading";
import Forecast from "./compontents/forecast";
import Current from "./compontents/current";
import Hourly from "./compontents/hourly";

export default function App() {
	const { dispatch, state } = React.useContext(Store);

	const fetchDataAction = React.useCallback(() => {
		return GetData(dispatch);
	}, [dispatch]);

	React.useEffect(() => {
		fetchDataAction();
	}, [state.coords, fetchDataAction]);


	if (Object.entries(state.weather).length > 0) {
		return (
			<React.Fragment>
				<Heading />
				<main className="data-grid">
					<Current />
					<Hourly />
					<Forecast />
				</main>
			</React.Fragment>
		);
	} else {
		return (
			<div className="notification">
				<div className="notification-content">
					<header>Welcome to Stratus</header>
					<p>{state.message}</p>
				</div>
			</div>
		)
	}
}