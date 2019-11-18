import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/appHeaderStyles.module.css';

import { ReactComponent as Logo } from '../images/companion_logo.svg';
import { ReactComponent as BackwardSvg } from '../images/header_buttons/backward_button.svg';
import { ReactComponent as SearchSvg } from '../images/header_buttons/search_button.svg';
import { ReactComponent as SettingsSvg } from '../images/header_buttons/settings_button.svg';

const chatsArrayKey = 'chatsArray';

export default function ChatHeader(props) {
	const { chatId } = useParams();
	const storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
	let companionName = "Companion's name";
	if (storageChatArray !== null) {
		companionName = storageChatArray[chatId].companion;
	}

	return (
		<div className={styles.app_header}>
			<Link to="/" className={styles.button}>
				<BackwardSvg className={styles.button_img} />
			</Link>
			<div className={styles.companion}>
				<div className={styles.companion_image}>
					<Logo className={styles.companion_logo} />
				</div>
				<div className={styles.companion_info}>
					<span className={styles.companion_name}>{companionName}</span>
					<span className={styles.companion_status}>была 2 часа назад</span>
				</div>
			</div>
			<button type="button" className={styles.button}>
				<SearchSvg className={styles.button_img} />
			</button>
			<button type="button" className={styles.button}>
				<SettingsSvg className={styles.button_img} />
			</button>
		</div>
	);
}
