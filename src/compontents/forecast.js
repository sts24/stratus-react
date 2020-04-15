import React from "react";
import { Store } from '../Store';
import Loading from "./loading";
import ForecastItem from "./forecastItem";

export const Forecast = () => {

	const { state } = React.useContext(Store);

	return (
		<section className="grid-col grid-forecast">
			<h2>Extended Forecast</h2>

			{ Object.entries(state.forecast).length > 0 ?

				<ul className="forecast-list">
					{state.forecast.periods.map((item, index) => {

						return (
							<ForecastItem item={item} key={index} />
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