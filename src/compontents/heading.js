import React from 'react';
import { Store } from '../Store';
import axios from "axios";


const Heading = () => {

	const { state, dispatch } = React.useContext(Store);

	const [searchResults, setSearchResult] = React.useState([]);

	const makeSearch = (e) => {
		e.preventDefault();

		console.log(e.target.value.length);

		if (e.target.value.length >= 3) {
			console.log('searched');
			const searchValue = e.target.value;

			axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + searchValue + '&key=3d5358bd0ebe4d35a5ebf97a2322d2c7&language=en&pretty=0&roadinfo=0&countrycode=us&no_annotations=1&limit=100')
				.then(response => {
					setSearchResult(response.data.results);
				});
		}

		else if(e.target.value === ''){
			console.log('cleared');
			setSearchResult([]);
		}
	}

	function selectResult(e) {
		e.preventDefault();
		const resultIndex = e.target.dataset.index;
		const newCoords = searchResults[resultIndex].geometry.lat + ',' + searchResults[resultIndex].geometry.lng;

		dispatch({
			type: 'SET_COORDS',
			payload: newCoords
		});

		setSearchResult([]);
	}

	if (Object.entries(state.weather).length > 0) {
		const loc = state.weather.relativeLocation.properties;

		return (
			<header className="app-header">
				<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>

				<input type="search" onChange={makeSearch} className="city-search" placeholder="Search" />

				{ searchResults.length > 0 &&
				<ul className="search-results">
					{searchResults.map((item, index) => {
						return <li key={index}><button className="search-select" data-index={index} onClick={selectResult}>{item.formatted}</button></li>
					})}
				</ul>
				}

			</header>
		)
	}
}

export default Heading