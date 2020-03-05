import React from 'react';
import { Store } from '../Store';
import axios from "axios";


const Heading = () => {

	// global state stuff
	const { state, dispatch } = React.useContext(Store);

	// local state for search results
	const [searchResults, setSearchResult] = React.useState({
		"results": [],
		"active": false
	});

	// local state for recent searches
	const [recentSearches, setRecentSearch] = React.useState([]);

	// get data from browser's localstorage of recent searches
	const getSavedSearches = () => {
		if(window.localStorage.length > 0){
			let savedSearches = [];
			Object.keys(window.localStorage).forEach((key, index) => {
				savedSearches[index] = JSON.parse(window.localStorage[key]);
				savedSearches[index]['id'] = key;
			});
			setRecentSearch(savedSearches);
		}
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

			axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + searchValue + '&key=3d5358bd0ebe4d35a5ebf97a2322d2c7&language=en&pretty=0&roadinfo=0&countrycode=us&no_annotations=1&limit=12')
				.then(response => {
					setSearchResult({ 
						"results": response.data.results,
						"active": false
					});
				});
		
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

		const newCoords = e.target.dataset.coords;
		const newName = e.target.innerText;

		console.log(newCoords);

		dispatch({
			type: 'SET_COORDS',
			payload: newCoords
		});

		window.localStorage.setItem(newCoords, JSON.stringify({ 
			"name": newName,
			"coords": newCoords
		}));

		setSearchResult({ 
			"results": [],
			"active": false
		});
	}

	// remove a saved search item
	function removeSavedSearch(e) {
		e.preventDefault();

		const coords = e.target.dataset.coords;
		let updatedRecentSearches = [...recentSearches];

		for( var i = 0; i < updatedRecentSearches.length; i++){ 
			if ( updatedRecentSearches[i].coords === coords) {
				updatedRecentSearches.splice(i, 1); 
			}
		}

		console.log(updatedRecentSearches);

		localStorage.removeItem(coords);
		setRecentSearch(updatedRecentSearches);
	}

	// on search focus
	const inputActive = (e) => {
		e.preventDefault();

		getSavedSearches();

		setSearchResult({
			...searchResults,
			active: true
		});
	}

	// const inputInactive = (e) => {
	// 	// e.preventDefault();

	// 	// setSearchResult({
	// 	// 	...searchResults,
	// 	// 	active: false
	// 	// });
	// }


	function SearchListItem(props){
		return (
			<li aria-selected="false" id={props.index} role="option" tabIndex="-1">
				<button className="search-select" data-coords={props.item.coords} onClick={selectResult}>{props.item.name}</button>
				{props.children}
			</li>
		)
	}


	if (Object.entries(state.weather).length > 0) {
		const loc = state.weather.relativeLocation.properties;

		// const currentLoc = {
		// 	name: "Current Location",
		// 	coords: state.currentLocCoords
		// }

		return (
			<header className="app-header">
				<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>
				<input aria-owns="search-results-list" type="search" onChange={makeSearch} className="city-search" placeholder="Search" onFocus={inputActive} />

				
				<ul className="search-results" id="search-results-list" role="listbox" aria-expanded="false">

					{/* <SearchListItem key="current-loc" item={currentLoc} /> */}
					
					{ recentSearches.length > 0 &&
						recentSearches.map((item, index) => {
							return (
								<SearchListItem key={'recent-'+index} item={item} index={index}>
									<button className="search-clear" data-index={index} data-coords={item.coords} onClick={removeSavedSearch}>𝘅</button>
								</SearchListItem>
							)
						})
					}

					{ searchResults.results.length > 0 &&
						searchResults.results.map((item,index) => {
							let formattedResult = {
								name: item.formatted,
								coords: item.geometry.lat+','+item.geometry.lng
							}

							return <SearchListItem key={'result-'+index} item={formattedResult} index={index} />
						})
					}
				</ul>
				
				

			</header>
		)
	}
}

export default Heading