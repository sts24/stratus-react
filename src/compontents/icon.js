import React from 'react';

const iconSet = {
	"Clear": "Sun.svg",
	"Mostly Clear": "Sun-Low.svg",
	"Sunny": "Sun.svg"
}

export const Icon = (props) => {

	const iconType = iconSet[props.type];

	return <img src={"/weather-icons/" + iconType } alt={props.type} className={props.className} />

}

export default Icon