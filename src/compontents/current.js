import React from "react";
import { Store } from '../Store';
import Loading from "./loading";


export const Current = () => {

	const { state } = React.useContext(Store);
	const currentCond = Object.entries(state.hourly).length > 0 ? state.hourly.periods[0] : [];

	const formattedTime = (rawTime) => {
		let newDate = new Date(rawTime);

		return newDate.toLocaleTimeString([], {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: 'numeric',
			minutes: 'numeric'
		});
	};

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

			{ state.alerts.length > 0 ?
				state.alerts.map((alert, index) => {
					return (
						<section key={index} className="alert-box">
							<h3>{alert.properties.event}</h3>
							<p><strong>Areas Affected:</strong> {alert.properties.areaDesc}</p>
							<p><strong>Effective:</strong> {formattedTime(alert.properties.effective)}</p>
							<p><strong>Expires:</strong> {formattedTime(alert.properties.expires)}</p>
							<p>{alert.properties.description}</p>
							<p>{alert.properties.instruction}</p>
						</section>
					)
				})
			: null }
		</div>
	)
	

}

export default Current;