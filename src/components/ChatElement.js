import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/chatElemStyles.module.scss';

import { ReactComponent as Tick } from '../images/indicators/tick.svg';
import { ReactComponent as DoubleTick } from '../images/indicators/double_tick.svg';
import { ReactComponent as Logo } from '../images/companion_logo.svg';

const indicateArray = [
	'',
	<Tick key={1} className={styles.tick} />,
	<DoubleTick key={2} className={styles.tick} />,
];

export default function ChatElement(props) {
	return (
		<Link to={`/chat_id=${props.id}`} className={styles.chat_elem}>
			<div className={styles.companion_img}>
				<Logo className={styles.companion_logo} />
			</div>
			<div className={styles.text_info}>
				<div className={styles.message_preview}>
					<span className={styles.companion_name}>{props.companionName}</span>
					<span className={styles.lastmessage_text}>
						{props.lastmessageText}
					</span>
				</div>
				<div className={styles.lastmessage_info}>
					<span className={styles.lastmessage_time}>
						{props.lastmessageTime}
					</span>
					<div className={styles.indicator}>
						{indicateArray[props.indicator]}
					</div>
				</div>
			</div>
		</Link>
	);
}

ChatElement.propTypes = {
	id: PropTypes.number.isRequired,
	indicator: PropTypes.number.isRequired,
	lastmessageText: PropTypes.string.isRequired,
	lastmessageTime: PropTypes.string.isRequired,
	companionName: PropTypes.string.isRequired,
};
