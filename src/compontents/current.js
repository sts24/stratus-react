import React from "react";
import { Store } from '../Store';
import Loading from "./loading";


export const Current = () => {

	const { state } = React.useContext(Store);
	const currentCond = Object.entries(state.hourly).length > 0 ? state.hourly.periods[0] : [];

	return (
		<div className="grid-col grid-current">
			<h2>Currently</h2>

			{ Object.entries(state.hourly).length > 0 ?
				<figure className="current-conditions">
					<div className="forecast-day">{currentCond.name}</div>
					<div className="forecast-desc">{currentCond.shortForecast}</div>
					<div className="forecast-temp">{currentCond.temperature}&#8457;</div>
					<div className="forecast-wind">{currentCond.windSpeed} {currentCond.windDirection}</div>
				</figure>
			:
				<Loading text="Current Conditions" />
			}
		</div>
	)
	

}

export default Current;