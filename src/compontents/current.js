import React from "react";
import { Store } from '../Store';
import Loading from "./loading";
import Alert from "./alert";
import Icon from "./icon";

export const Current = () => {

	const { state } = React.useContext(Store);
	const currentCond = Object.entries(state.hourly).length > 0 ? state.hourly.periods[0] : [];

	return (
		<div className="grid-col grid-current">
			<h2>Currently</h2>

			{ Object.entries(state.hourly).length > 0 ?
				<figure className="current-conditions">
					<Icon type={currentCond.shortForecast} className="current-icon" />

					<div className="forecast-day">{currentCond.name}</div>
					<div className="forecast-desc">{currentCond.shortForecast}</div>
					<div className="forecast-temp">{currentCond.temperature}&#8457;</div>
					<div className="forecast-wind">{currentCond.windSpeed} {currentCond.windDirection}</div>
				</figure>
			:
				<Loading text="Current Conditions" />
			}

			{ state.alerts.length > 0 ?
				state.alerts.map((alert, index) => {
					return <Alert key={index} alert={alert} />
				})
			: null }
		</div>
	)
	

}

export default Current;