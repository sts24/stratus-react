import React from 'react';

export const Store = React.createContext();

const initialState = {
	coords: "",
	hourly: {},
	weather: {},
	forecast: {},
	hasLocation: false,
	message: ""
}

function reducer(state, action) {

	switch (action.type) {
		case 'SET_MESSAGE':
			return { ...state, message: action.payload }
		case 'SET_COORDS':
			return { ...state, coords: action.payload }
		case 'SET_WEATHER':
			return { ...state, weather: action.payload }
		case 'SET_FORECAST':
			return { ...state, forecast: action.payload }
		case 'SET_HOURLY':
			return { ...state, hourly: action.payload }
		default:
			return state;
	}
}

export function getTime(data) {
	let newDate = new Date(data);

	return newDate.toLocaleTimeString([], {
		hour: 'numeric'
	});
}

export function StoreProvider(props) {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const value = { state, dispatch };

	return <Store.Provider value={value}>{props.children}</Store.Provider>;
}