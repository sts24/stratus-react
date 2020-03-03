import React from "react";
import { Store } from '../Store';
import Loading from "./loading";
import Icon from "./icon";

export const Forecast = () => {

	const { state } = React.useContext(Store);

	return (
		<div className="grid-col grid-forecast">
			<h2>Extended Forecast</h2>

			{ Object.entries(state.forecast).length > 0 ?

				<ul className="forecast-list">
					{state.forecast.periods.map((item, index) => {
						let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

						return (
							<li className={`forecast-item ${daytimeClass}`} key={item.startTime}>
								<div className="forecast-day">{item.name}</div>
								<div className="forecast-desc">
									<Icon type={item.shortForecast} className="forecast-icon" />
									{item.shortForecast}
								</div>
								<div className="forecast-temp">{item.temperature}&#8457;</div>
								<div className="forecast-wind">{item.windSpeed} {item.windDirection}</div>
								<div className="forecast-full-desc">{item.detailedForecast}</div>
							</li>
						)

					})}
				</ul>

			:
				<Loading text="Extended Forecast" />
				}
		</div>
	)
	

}

export default Forecast;