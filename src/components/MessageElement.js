import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/messageElemStyles.module.css';

const indicateArray = ['', '', ''];
indicateArray[0] = '';
indicateArray[1] = (
	<svg
		className="tick"
		x="0px"
		y="0px"
		width="2vh"
		height="2vh"
		viewBox="0 0 448.8 448.8"
		style={{ fill: 'currentColor' }}
	>
		<polygon points="142.8,323.85 35.7,216.75 0,252.45 142.8,395.25 448.8,89.25 413.1,53.55" />
	</svg>
);
indicateArray[2] = (
	<svg
		className="double-tick"
		x="0px"
		y="0px"
		width="2vh"
		height="2vh"
		viewBox="0 0 594.149 594.149"
		style={{ fill: 'currentColor' }}
	>
		<path
			d="M448.8,161.925l-35.7-35.7l-160.65,160.65l35.7,35.7L448.8,161.925z M555.899,126.225l-267.75,270.3l-107.1-107.1
		l-35.7,35.7l142.8,142.8l306-306L555.899,126.225z M0,325.125l142.8,142.8l35.7-35.7l-142.8-142.8L0,325.125z"
		/>
	</svg>
);

export default function MessageElement(props) {
	return (
		<div className={`${styles.message_element} ${styles[props.position]}`}>
			<div className={styles.message_text}>{props.messageText}</div>
			<div className={styles.message_info}>
				<span className={styles.message_time}>{props.messageTime}</span>
				<div className={styles.mes_indicator}>
					{indicateArray[props.indicator]}
				</div>
			</div>
		</div>
	);
}

MessageElement.propTypes = {
	messageText: PropTypes.string.isRequired,
	messageTime: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
	indicator: PropTypes.number.isRequired,
};
