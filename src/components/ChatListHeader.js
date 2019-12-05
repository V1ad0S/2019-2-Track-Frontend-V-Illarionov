import React from 'react';
import styles from '../styles/appHeaderStyles.module.scss';

import { ReactComponent as MenuSvg } from '../images/header_buttons/menu_button.svg';
import { ReactComponent as SettingsSvg } from '../images/header_buttons/settings_button.svg';

export default function ChatListHeader(props) {
	return (
		<div className={styles.app_header}>
			<button type="button" className={styles.button}>
				<MenuSvg className={styles.button_img} />
			</button>
			<span className={styles.header}>Messenger</span>
			<button type="button" className={styles.button}>
				<SettingsSvg className={styles.button_img} />
			</button>
		</div>
	);
}
