import React from "react";
import { Store } from "./Store";
import GetData from "./GetData";

import Heading from "./compontents/heading";
import Forecast from "./compontents/forecast";
import Current from "./compontents/current";
import Hourly from "./compontents/hourly";

import { ReactComponent as SVGsprite } from "./assets/icon-sprite.svg";

export default function App() {
	const { dispatch, state } = React.useContext(Store);

	const fetchDataAction = React.useCallback(() => {
		return GetData(dispatch, state.coords);
	}, [dispatch, state.coords]);

	React.useEffect(() => {
		fetchDataAction();
	}, [state.coords, fetchDataAction]);


	if (Object.entries(state.weather).length > 0) {
		return (
			<React.Fragment>
				<SVGsprite />
				<Heading />
				<main className="data-grid">
					<Current />
					<Hourly />
					<Forecast />
				</main>
				<aside className="credits-section">
					<p>Stratus is <a href="https://smithscott.net/portfolio/stratus/">created by Scott Smith</a></p>
				</aside>
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