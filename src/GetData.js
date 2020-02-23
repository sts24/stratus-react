import axios from "axios";

export const GetData = async (dispatch, coords) => {

	console.log(coords);

	dispatch({
		type: 'SET_MESSAGE',
		payload: "Getting your location."
	});

	return new Promise((resolve, reject) => {
		if (coords === '') {
			const data = getLocation();
			resolve(data);
			return data;
		} else {
			resolve(coords);
			return coords;
		}
	})
		.then(result => {
			dispatch({
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
			dispatch({
				type: 'SET_MESSAGE',
				payload: error
			});
		});

	function getLocation() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((location) => {

				let lat = location.coords.latitude.toFixed(4);
				let long = location.coords.longitude.toFixed(4);

				const newCoords = lat + ',' + long;

				dispatch({
					type: 'SET_MESSAGE',
					payload: "Getting location."
				});

				resolve(newCoords);
			}, () => {
				reject("Please enable location in your browser.");
			});
		});
	}

	function getWeather(value) {
		// this gets all endpoints from a location based on the passed in coordinates

		return new Promise((resolve, reject) => {
			dispatch({
				type: 'SET_MESSAGE',
				payload: "Getting data from the National Weather Service."
			});

			axios.get('https://api.weather.gov/points/' + value)
				.then(response => {

					dispatch({
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
	function getForecast(NWSdata) {
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
				.catch(() => {
					reject("Forecast data could not be reached.");
				});
		});
	}

	function getHourly(value) {

		return new Promise((resolve, reject) => {
			axios.get(value.NWS.forecastHourly)
				.then(response => {

					dispatch({
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