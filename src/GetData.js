import React from "react";
//import { Store } from "./Store";
import axios from "axios";



export const GetData = async () => {

	//const { React.dispatch } = React.useContext(Store);

	React.dispatch({
		type: 'SET_MESSAGE',
		payload: "Getting your location."
	});

	return new Promise((resolve, reject) => {
		const data = getLocation();
		resolve(data);
		return data;
	})
	.then(result => {
		React.dispatch({
			type: 'SET_MESSAGE',
			payload: ""
		});

		const data = getWeather(result);
		return data;
	})
	.then(result => {
		const data = getForecast(result);
		return data;
	})
	.then(result => {
		const data = getHourly(result);
		return data;
	})
	.catch(error => {
		React.dispatch({
			type: 'SET_MESSAGE',
			payload: error
		});
	});

	function getLocation(){
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((location) => {

				React.dispatch({
					type: 'SET_LOCATION',
					payload: true
				});

				React.dispatch({
					type: 'SET_MESSAGE',
					payload: "Getting location."
				});

				resolve(location.coords);
			}, () => {
				reject("Please enable location in your browser.");
			});
		});
	}

	function getWeather(value){
		// this gets all endpoints from a location based on the passed in coordinates

		return new Promise((resolve, reject) => {
			React.dispatch({
				type: 'SET_MESSAGE',
				payload: "Getting data from the National Weather Service."
			});

			let lat = value.latitude.toFixed(4);
			let long = value.longitude.toFixed(4);

			axios.get('https://api.weather.gov/points/' + lat + ',' + long)
				.then(response => {

					React.dispatch({
						type: 'SET_WEATHER',
						payload: response.data.properties
					});

					resolve(response.data.properties);
				})
				.catch(() => {
					reject("The National Weather Service could not be reached.");
				});

		});
	}

	// get forecast data
	function getForecast(NWSdata){
		//console.log(NWSdata);

		return new Promise((resolve, reject) => {
			axios.get(NWSdata.forecast)
				.then(response => {

					React.dispatch({
						type: 'SET_FORECAST',
						payload: response.data.properties
					});

					resolve({
						"forecast": response.data.properties, 
						"NWS": NWSdata
					});
				})
				.catch(() => {
					reject("Forecast data could not be reached.");
				});
		});
	}

	function getHourly(value){

		return new Promise((resolve, reject) => {
			axios.get(value.NWS.forecastHourly)
				.then(response => {

					React.dispatch({
						type: 'SET_HOURLY',
						payload: response.data.properties
					});

					resolve(response.data.properties);
				})
				.catch(() => {
					reject("Hourly forecast data could not be reached.");
				});
		})
	}
}

export default GetData;