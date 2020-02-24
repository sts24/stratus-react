import React from 'react';
import { Store } from '../Store';
import axios from "axios";


const Heading = () => {

	const { state, dispatch } = React.useContext(Store);

	const [searchResults, setSearchResult] = React.useState({
		"results": [],
		"active": false
	});

	const makeSearch = (e) => {
		e.preventDefault();

		if (e.target.value.length >= 3) {
			const searchValue = e.target.value;

			setSearchResult({
				"results": [],
				"active": true
			});

			setTimeout(() => {
				axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + searchValue + '&key=3d5358bd0ebe4d35a5ebf97a2322d2c7&language=en&pretty=0&roadinfo=0&countrycode=us&no_annotations=1&limit=100')
					.then(response => {
						setSearchResult({ 
							"results": response.data.results,
							"active": false
						});
					});
			}, 1000);
		}
		else if(e.target.value === ''){
			setSearchResult({ 
				"results": [],
				"active": false
			});
		}
	}

	function selectResult(e) {
		e.preventDefault();
		const resultIndex = e.target.dataset.index;
		const newCoords = searchResults.results[resultIndex].geometry.lat + ',' + searchResults.results[resultIndex].geometry.lng;

		dispatch({
			type: 'SET_COORDS',
			payload: newCoords
		});

		setSearchResult({ 
			"results": [],
			"active": false
		});
	}


	function SearchResultListItems(props){
		return props.resultsList.results.map((item, index) => {
			return <li key={index}><button className="search-select" data-index={index} onClick={selectResult}>{item.formatted}</button></li>
		});
	}

	function SearchWaiting(){
		return <li>Searching...</li>
	}

	if (Object.entries(state.weather).length > 0) {
		const loc = state.weather.relativeLocation.properties;

		return (
			<header className="app-header">
				<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>
				<input type="search" onChange={makeSearch} className="city-search" placeholder="Search" />
			
				{ searchResults.results.length > 0 &&
				<ul className="search-results">
					{ searchResults.active === true ?
						<SearchWaiting />
					:
						<SearchResultListItems resultsList={searchResults} />
					}
				</ul>
				}

			</header>
		)
	}
}

export default Heading