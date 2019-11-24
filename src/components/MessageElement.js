import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/messageElemStyles.module.scss';

import { ReactComponent as Tick } from '../images/indicators/tick.svg';
import { ReactComponent as DoubleTick } from '../images/indicators/double_tick.svg';

const indicateArray = [
	'',
	<Tick key={1} className={styles.indicator} />,
	<DoubleTick key={2} className={styles.indicator} />,
];

function MessageContent(props) {
	let content = <div />;

	if (props.contentType === 'text') {
		const re = /(https:\/\/\S+[^\s.,> )\];'"!?])/;
		const parts = props.messageContent.split(re);

		for (let i = 1; i < parts.length; i += 2) {
			parts[i] = (
				<a
					className={styles.link}
					key={`link${i}`}
					target="_blank"
					rel="noopener noreferrer"
					href={parts[i]}
				>
					{parts[i]}
				</a>
			);
		}

		content = <div className={styles.message_text}>{parts}</div>;
	} else if (props.contentType === 'img') {
		content = (
			<img
				className={styles.image}
				src={props.messageContent[0]}
				alt={props.messageContent[0]}
				onLoad={() => {
					message.current.scrollIntoView();
					window.URL.revokeObjectURL(props.messageContent[0]);
				}}
			/>
		);
	} else if (props.contentType === 'audio') {
		content = (
			<audio
				src={props.messageContent}
				controls
				className={styles.audio}
				onLoad={() => {
					window.URL.revokeObjectURL(props.messageContent);
				}}
			/>
		);
	}

	return content;
}

const message = React.createRef();
export default function MessageElement(props) {
	useEffect(() => {
		message.current.scrollIntoView();
	});

	return (
		<div
			ref={message}
			className={`${styles.message_element} ${styles[props.position]}`}
		>
			<MessageContent
				messageContent={props.messageContent}
				contentType={props.contentType}
			/>
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
	messageContent: PropTypes.string.isRequired,
	messageTime: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
	contentType: PropTypes.string.isRequired,
	indicator: PropTypes.number.isRequired,
};
