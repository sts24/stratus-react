import React from "react";
import { Store } from '../Store';
import Loading from "./loading";
import Icon from "./icon";

export const Forecast = () => {

	const { state } = React.useContext(Store);

	const showMore = (e) => {
		e.preventDefault();
		const forecastIndex = e.target.dataset.index;
		document.querySelector('#forecast-'+forecastIndex).classList.toggle('forecast-extra-open');	
	}

	return (
		<section className="grid-col grid-forecast">
			<h2>Extended Forecast</h2>

			{ Object.entries(state.forecast).length > 0 ?

				<ul className="forecast-list">
					{state.forecast.periods.map((item, index) => {
						let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

						return (
							<li className={`forecast-item ${daytimeClass}`} key={item.startTime}>
								<div className="forecast-day">{item.name}</div>
								<div className="forecast-desc">
									<Icon type={item.icon} className="forecast-icon" />
									{item.shortForecast}
								</div>
								<div className="forecast-temp">{item.temperature}&#8457;</div>
								<button className="forecast-extra-toggle" data-index={index} onClick={showMore}>More Info</button>

								<aside className="forecast-extra" id={'forecast-' + index}>
									<div className="forecast-wind"><strong>Wind</strong> {item.windSpeed} {item.windDirection}</div>
									<div className="forecast-full-desc"><strong>Forecast Detail</strong> {item.detailedForecast}</div>
								</aside>
							</li>
						)

					})}
				</ul>

			:
				<Loading text="Extended Forecast" />
			}
		</section>
	)
	

}

export default Forecast;