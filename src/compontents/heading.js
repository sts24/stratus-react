import React from 'react';
import { Store } from '../Store';
import axios from "axios";


const Heading = () => {

	const { state } = React.useContext(Store);

	const [searchResults, setSearchResult] = React.useState([]);

	const makeSearch = (e) => {
		e.preventDefault();

		if (e.target.value.length > 3) {
			axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + e.target.value + '&key=3d5358bd0ebe4d35a5ebf97a2322d2c7&language=en&pretty=1')
				.then(response => {
					setSearchResult(response.data.results);
				});
		}
	}

	if (Object.entries(state.weather).length > 0) {
		const loc = state.weather.relativeLocation.properties;

		return (
			<header className="app-header">
				<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>

				<input type="search" onChange={makeSearch} className="city-search" />

				<ul>
					{searchResults.map((item, index) => {
						return <li key={index}>{item.formatted}</li>
					})}
				</ul>

			</header>
		)
	}
}

export default Heading