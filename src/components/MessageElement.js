import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/messageElemStyles.module.scss';

import { ReactComponent as Tick } from '../images/indicators/tick.svg';
import { ReactComponent as DoubleTick } from '../images/indicators/double_tick.svg';

const indicateArray = [
	'',
	<Tick key={1} className={styles.indicator} />,
	<DoubleTick key={2} className={styles.indicator} />,
];

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
