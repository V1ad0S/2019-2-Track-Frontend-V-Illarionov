import React from 'react';
import styles from '../styles/appHeaderStyles.module.css';

import { ReactComponent as BackwardSvg } from '../images/header_buttons/backward_button.svg';
import { ReactComponent as SettingsSvg } from '../images/header_buttons/settings_button.svg';

export default function ChatListHeader(props) {
	return (
		<div className={styles.app_header}>
			<button type="button" className={styles.button}>
				<BackwardSvg className={styles.button_img} />
			</button>
			<span className={styles.header}>Messenger</span>
			<button type="button" className={styles.button}>
				<SettingsSvg className={styles.button_img} />
			</button>
		</div>
	);
}
