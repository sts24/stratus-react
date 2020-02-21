import React from "react";
import { Store, getTime } from '../Store';
import Loading from "./loading";

export default function Hourly() {

	const { state } = React.useContext(Store);


	if(Object.entries(state.hourly).length > 0){
		const hourlyCond = state.hourly.periods;

		return (
			<div className="grid-col grid-hourly">
				<h2>Next 12 Hours</h2>
				<ul className="hourly-list">
					{hourlyCond.slice(1, 13).map(item => {
						let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

						return (
							<li className={`hourly-item ${daytimeClass}`} key={item.startTime} >
								<time>{getTime(item.startTime)}</time>
								<div className="hourly-desc">{item.shortForecast}</div>
								<div className="hourly-temp">{item.temperature}&#8457;</div>
								<div className="hourly-wind">{item.windSpeed} {item.windDirection}</div>
							</li>
						)

					})}
				</ul>
			</div>
		)
	} else {
		return <Loading text="Hourly Forecast" />
	}

}