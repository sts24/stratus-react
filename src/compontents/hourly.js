import React from "react";
import { Store, getTime } from '../Store';
import Loading from "./loading";
import Icon from "./icon";

export default function Hourly() {

	const { state } = React.useContext(Store);
	const hourlyCond = Object.entries(state.hourly).length > 0 ? state.hourly.periods : [];

	return (
		<div className="grid-col grid-hourly">
			<h2>Next 12 Hours</h2>

			{ Object.entries(state.hourly).length > 0 ?
				<ul className="hourly-list">
					{hourlyCond.slice(1, 13).map(item => {
						let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

						return (
							<li className={`hourly-item ${daytimeClass}`} key={item.startTime} >
								<time>{getTime(item.startTime)}</time>
								<div className="hourly-desc">
									<Icon type={item.shortForecast} className="forecast-icon" />
									{item.shortForecast}
								</div>
								<div className="hourly-temp">{item.temperature}&#8457;</div>
								<div className="hourly-wind">{item.windSpeed} {item.windDirection}</div>
							</li>
						)

					})}
				</ul>
			:
				<Loading text="Hourly Forecast" />
			}
		</div>
	)
	

}