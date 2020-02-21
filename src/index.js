import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './Store';

import './scss/styles.scss';

ReactDOM.render(
	<StoreProvider>
		<App />
	</StoreProvider>,
	document.getElementById("root")
);

	// render() {
	// 	if (this.store.status.hasLocation && this.store.status.hasWeather) {
	// 		let loc = this.store.weather.relativeLocation.properties;
	// 		return (
	// 			<React.Fragment>
	// 				<header className="app-header">
	// 					<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>
	// 				</header>
	// 				<main className="data-grid">
	// 					<Current />
	// 					<Hourly />
	// 					<Forecast />
	// 				</main>
	// 			</React.Fragment>
	// 		);
	// 	} else {
	// 		return (
	// 			<div className="notification">
	// 				<div className="notification-content">
	// 					{ this.store.status.message }
	// 				</div>
	// 			</div>
	// 		)
	// 	}
	// }