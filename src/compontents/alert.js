import React from 'react';

export const Alert = (props) => {
	const index = props.index;
	const alert = props.alert;

	const [alertState, setAlertState] = React.useState({
		'toggle': false,
		'btnLabel': 'Read More'
	});

	const formattedTime = (rawTime) => {
		let newDate = new Date(rawTime);

		return newDate.toLocaleTimeString([], {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: 'numeric',
			minutes: 'numeric'
		});
	};

	const toggleBox = (e) => {
		e.preventDefault();

		if(alertState.toggle === false){
			setAlertState({
				'btnLabel': 'Hide Alert',
				'toggle': true
			});
		} else if(alertState.toggle === true){
			setAlertState({
				'btnLabel': 'Read More',
				'toggle': false
			});
		}

		
	}

	return (
		<section key={index} className="alert-box" >
			<h3>{alert.properties.event}</h3>
			<button className="alert-box-button" onClick={toggleBox}>{alertState.btnLabel}</button>
			<div className={"alert-box-content " + (alertState.toggle ? 'alert-box-content-open' : '')}>
				<p><strong>Areas Affected:</strong> {alert.properties.areaDesc}</p>
				<p><strong>Effective:</strong> {formattedTime(alert.properties.effective)}</p>
				<p><strong>Expires:</strong> {formattedTime(alert.properties.expires)}</p>
				<p>{alert.properties.description}</p>
				<p>{alert.properties.instruction}</p>
			</div>
		</section>
	)
}

export default Alert