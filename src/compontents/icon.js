import React from 'react';


const iconSet = {
	"skc": {
		"description": "Fair/clear",
		"svg": "Sun"
	},
	"few": {
		"description": "A few clouds",
		"svg": "Sun-Low"
	},
	"sct": {
		"description": "Partly cloudy",
		"svg": "Cloud-Sun"
	},
	"bkn": {
		"description": "Mostly cloudy",
		"svg": "Cloud-Fog-Sun-Alt"
	},
	"ovc": {
		"description": "Overcast",
		"svg": "Cloud-Fog-Sun-Alt"
	},
	"wind_skc": {
		"description": "Fair/clear and windy",
		"svg": "Wind"
	},
	"wind_few": {
		"description": "A few clouds and windy",
		"svg": "Cloud-Wind-Sun"
	},
	"wind_sct": {
		"description": "Partly cloudy and windy",
		"svg": "Cloud-Wind-Sun"
	},
	"wind_bkn": {
		"description": "Mostly cloudy and windy",
		"svg": "Cloud-Wind"
	},
	"wind_ovc": {
		"description": "Overcast and windy",
		"svg": "Cloud-Wind"
	},
	"snow": {
		"description": "Snow",
		"svg": "Snowflake"
	},
	"rain_snow": {
		"description": "Rain/snow",
		"svg": "Cloud-Snow"
	},
	"rain_sleet": {
		"description": "Rain/sleet",
		"svg": "Cloud-Snow"
	},
	"snow_sleet": {
		"description": "Rain/sleet",
		"svg": "Cloud-Rain"
	},
	"fzra": {
		"description": "Freezing rain",
		"svg": "Cloud-Rain"
	},
	"rain_fzra": {
		"description": "Rain/freezing rain",
		"svg": "Cloud-Rain"
	},
	"snow_fzra": {
		"description": "Freezing rain/snow",
		"svg": "Cloud-Snow"
	},
	"sleet": {
		"description": "Sleet",
		"svg": "Cloud-Rain"
	},
	"rain": {
		"description": "Rain",
		"svg": "Cloud-Rain"
	},
	"rain_showers": {
		"description": "Rain showers (high cloud cover)",
		"svg": "Cloud-Rain-Sun"
	},
	"rain_showers_hi": {
		"description": "Rain showers (low cloud cover)",
		"svg": "Cloud-Rain-Sun"
	},
	"tsra": {
		"description": "Thunderstorm (high cloud cover)",
		"svg": "Cloud-Lightning"
	},
	"tsra_sct": {
		"description": "Thunderstorm (medium cloud cover)",
		"svg": "Cloud-Lightning"
	},
	"tsra_hi": {
		"description": "Thunderstorm (low cloud cover)",
		"svg": "Cloud-Lightning"
	},
	"tornado": {
		"description": "Tornado",
		"svg": "Tornado"
	},
	"hurricane": {
		"description": "Hurricane conditions",
		"svg": "Cloud-Wind"
	},
	"tropical_storm": {
		"description": "Tropical storm conditions",
		"svg": "Cloud-Wind"
	},
	"dust": {
		"description": "Dust",
		"svg": "Wind"
	},
	"smoke": {
		"description": "Smoke",
		"svg": "Wind"
	},
	"haze": {
		"description": "Haze",
		"svg": "Cloud-Fog-Alt"
	},
	"hot": {
		"description": "Hot",
		"svg": "Shades"
	},
	"cold": {
		"description": "Cold",
		"svg": "Thermometer-Zero"
	},
	"blizzard": {
		"description": "Blizzard",
		"svg": "Snowflake"
	},
	"fog": {
		"description": "Fog/mist",
		"svg": "Cloud-Fog"
	}
}

export const Icon = (props) => {

	// get icon code from NWS URL
	const [,,,,,,iconCode] = props.type.split('?')[0].split(',')[0].split('/');

	// get svg icon from object
	const iconType = iconSet[iconCode];

	//return <img src={"/weather-icons/" + iconType.svg + ".svg" } alt={iconType.description} className={props.className} />

	return (
		<svg className={"svg-icon icon-"+ iconType.svg +" "+props.className} shapeRendering="geometricPrecision" role="presentation">
			<use xlinkHref={"#icon-" + iconType.svg}></use>
    	</svg>
	)
}

export default Icon