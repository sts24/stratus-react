import React from "react";
import Icon from "./icon";

export const ForecastItem = (props) => {

	const item = props.item;
	const daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

	const [itemState, setItemState] = React.useState({
		'open': false,
	});

	const showMore = (e) => {
		e.preventDefault();

		if(itemState.open === false){
			setItemState({
				'open': true
			});
		} else if(itemState.open === true){
			setItemState({
				'open': false
			});
		}

	}

	
	return (
		<li 
		className={'forecast-item ' + daytimeClass +' '+ (itemState.open ? 'forecast-item-open' : '')}
		key={item.startTime} 
		onClick={showMore}>

			<div className="forecast-day">{item.name}</div>
			<div className="forecast-desc">
				<Icon type={item.icon} className="forecast-icon" />
				{item.shortForecast}
			</div>
			<div className="forecast-temp">{item.temperature}&#8457;</div>
			<aside className="forecast-extra">
				<div className="forecast-full-desc">{item.detailedForecast}</div>
				<div className="forecast-wind"><strong>Wind</strong> {item.windSpeed} {item.windDirection}</div>
			</aside>
		</li>
	)
	

}

export default ForecastItem;