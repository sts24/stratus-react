import React from 'react';
import { Store } from '../Store';
import axios from "axios";


const Heading = () => {

	const { state, dispatch } = React.useContext(Store);

	// local state for search results
	const [searchResults, setSearchResult] = React.useState({
		"results": [],
		"active": false
	});

	// local state for recent searches
	const [recentSearches, setRecentSearch] = React.useState([]);


	// get data from browser's localstorage of recent searches
	const getSavedSearches = (e) => {
		e.preventDefault();
		if(window.localStorage.length > 0){
			let savedSearches = [];
			Object.keys(window.localStorage).forEach((key, index) => {
				savedSearches[index] = JSON.parse(window.localStorage[key]);
				savedSearches[index]['id'] = key;
			});
			setRecentSearch(savedSearches);
		}
	}

	const hideSavedSearches = (e) => {
		e.preventDefault();

		setRecentSearch([]);
	}



	// search city API on input change and return coords

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


	// select city and get weather data

	function selectResult(e) {
		e.preventDefault();
		const resultIndex = e.target.dataset.index;
		const selectedResult = searchResults.results[resultIndex];
		const newCoords = selectedResult.geometry.lat + ',' + selectedResult.geometry.lng;
		
		let cityID = selectedResult.geometry.lat +'-'+ selectedResult.geometry.lng;

		dispatch({
			type: 'SET_COORDS',
			payload: newCoords
		});

		window.localStorage.setItem(cityID, JSON.stringify({ "name": selectedResult.formatted, "coords": newCoords}));

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

	function RecentSearchListItems(props){
		const savedItems = props.recent;
		
		return savedItems.map((item) => {
		return <li key={item.id}><button className="search-select">{item.name}</button></li>
		});

	}

	function SearchWaiting(){
		return <li><div className="search-select">Searching...</div></li>
	}


	if (Object.entries(state.weather).length > 0) {
		const loc = state.weather.relativeLocation.properties;

		return (
			<header className="app-header">
				<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>
				<input type="search" onChange={makeSearch} className="city-search" placeholder="Search" onFocus={getSavedSearches} onBlur={hideSavedSearches} />

				<ul className="search-results">
					
					{ Object.entries(recentSearches).length > 0 && searchResults.results.length == 0 ?
						<RecentSearchListItems recent={recentSearches} />
						: null
					}

					{ searchResults.active === true ?
						<SearchWaiting />
					:
						<SearchResultListItems resultsList={searchResults} />
					}
				</ul>
				

			</header>
		)
	}
}

export default Heading