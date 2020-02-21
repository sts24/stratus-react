import React from "react";
import { Store } from "./Store";
import axios from "axios";

import Forecast from "./compontents/forecast";
import Current from "./compontents/current";
import Hourly from "./compontents/hourly";

export default function App(){
	const { state, dispatch } = React.useContext(Store);

	const fetchDataAction = React.useCallback(async () => {

		dispatch({
			type: 'SET_MESSAGE',
			payload: "Welcome to Stratus."
		});

		return new Promise(function(resolve, reject) {
			const data = getLocation();
			resolve(data);
			return data;
		})
		.then(function(result) {
			dispatch({
				type: 'SET_MESSAGE',
				payload: ""
			});

			const data = getWeather(result);
			return data;
		})
		.then(function(result) {
			const data = getForecast(result);
			return data;
		})
		.then(function(result) {
			const data = getHourly(result);
			return data;
		});

		function getLocation(){
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition((location) => {

					dispatch({
						type: 'SET_LOCATION',
						payload: true
					});

					dispatch({
						type: 'SET_MESSAGE',
						payload: "Getting location."
					});

					resolve(location.coords);
				}, (error) => {
					dispatch({
						type: 'SET_MESSAGE',
						payload: error.code
					});
					reject(error.code);
				});
			});
		}

		function getWeather(value){
			// this gets all endpoints from a location based on the passed in coordinates

			return new Promise((resolve, reject) => {
				dispatch({
					type: 'SET_MESSAGE',
					payload: "Getting data from the National Weather Service."
				});

				let lat = value.latitude.toFixed(4);
				let long = value.longitude.toFixed(4);

				axios.get('https://api.weather.gov/points/' + lat + ',' + long)
					.then(response => {

						dispatch({
							type: 'SET_WEATHER',
							payload: response.data.properties
						});

						resolve(response.data.properties);
					})
					.catch(error => {
						reject(error);
					});

			});
		}

		// get forecast data
		function getForecast(NWSdata){
			//console.log(NWSdata);

			return new Promise((resolve, reject) => {
				axios.get(NWSdata.forecast)
					.then(response => {

						dispatch({
							type: 'SET_FORECAST',
							payload: response.data.properties
						});

						resolve({
							"forecast": response.data.properties, 
							"NWS": NWSdata
						});
					})
					.catch(error => {
						reject(error);
					});
			});
		}

		function getHourly(value){

			return new Promise((resolve, reject) => {
				axios.get(value.NWS.forecastHourly)
					.then(response => {

						dispatch({
							type: 'SET_HOURLY',
							payload: response.data.properties
						});

						resolve(response.data.properties);
					})
					.catch(error => {
						reject(error);
					});
			})
		}

	}, [dispatch]);

	React.useEffect(() => {
		fetchDataAction();
	}, [fetchDataAction]);

	
	if(Object.entries(state.weather).length > 0){
		const loc = state.weather.relativeLocation.properties;

		return (
			
			<React.Fragment>
				
				<header className="app-header">
					<h1><span>Weather for </span>{loc.city}, {loc.state}</h1>
				</header>
				<main className="data-grid">
					<Current />
					<Hourly />
					<Forecast />
				</main>
			</React.Fragment>
		);
	} else {
		return (
			<div className="notification">
				<div className="notification-content">
					{ state.message }
				</div>
			</div>
		)
	}
}