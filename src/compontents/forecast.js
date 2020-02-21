import React from "react";
import { Store } from '../Store';
import Loading from "./loading";

export const Forecast = () => {

	const { state } = React.useContext(Store);

	if(Object.entries(state.forecast).length > 0){
		return (
			<div className="grid-col grid-forecast">
				<h2>Extended Forecast</h2>
				<ul className="forecast-list">
					{state.forecast.periods.map((item, index) => {
						let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

						return (
							<li className={`forecast-item ${daytimeClass}`} key={item.startTime}>
								<div className="forecast-day">{item.name}</div>
								<div className="forecast-desc">{item.shortForecast}</div>
								<div className="forecast-temp">{item.temperature}&#8457;</div>
								<div className="forecast-wind">{item.windSpeed} {item.windDirection}</div>
								<div className="forecast-full-desc">{item.detailedForecast}</div>
							</li>
						)

					})}
				</ul>
			</div>
		)
	} else {
		return <Loading text="Extended Forecast" />
	}

}

export default Forecast;