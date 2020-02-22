import React from 'react';
import { Store } from '../Store';



const Heading = () => {
	
	const { state } = React.useContext(Store);

	const makeSearch = (e) => {
		e.preventDefault();
		console.log(e.target.value);
	}

	if(Object.entries(state.weather).length > 0){
		const loc = state.weather.relativeLocation.properties;

		return (
			<header className="app-header">
				<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>

				<input type="search" onChange={makeSearch} className="city-search" />
			</header>
		)
	}
}

export default Heading