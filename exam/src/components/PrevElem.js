import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/PrevElemStyles.module.css';

export default function PrevElem(props) {
	let windDirection = 'N/D';
	if (props.windDirection <= 56.25 && props.windDirection > 326.25) {
		windDirection = 'North';
	} else if (props.windDirection > 56.25 && props.windDirection <= 146.25) {
		windDirection = 'East';
	} else if (props.windDirection <= 236.25 && props.windDirection > 146.25) {
		windDirection = 'South';
	} else if (props.windDirection > 236.25 && props.windDirection <= 326.25) {
		windDirection = 'West';
	}

	const weatherInfo = `Humidity ${props.humidity} | ${windDirection} | ${props.windSpeed}`;

	return (
		<div className={styles.info_container}>
			<div className={styles.main_info}>
				<span className={styles.city_name}>{props.cityName}</span>
				<div className={styles.temp}>{`${props.temp} ℃`}</div>
			</div>
			<div className={styles.few_info}>
				<span>{weatherInfo}</span>
			</div>
		</div>
	);
}

PrevElem.propTypes = {
	windDirection: PropTypes.number.isRequired,
	humidity: PropTypes.number.isRequired,
	windSpeed: PropTypes.number.isRequired,
	temp: PropTypes.number.isRequired,
	cityName: PropTypes.string.isRequired,
};
