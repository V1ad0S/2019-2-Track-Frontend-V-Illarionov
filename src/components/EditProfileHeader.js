import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/appHeaderStyles.module.css';

import { ReactComponent as BackwardSvg } from '../images/header_buttons/backward_button.svg';
import { ReactComponent as Tick } from '../images/indicators/tick.svg';

export default function ProfileHeader(props) {
	return (
		<div className={styles.app_header}>
			<Link to="/" className={styles.button}>
				<BackwardSvg className={styles.button_img} />
			</Link>
			<span className={styles.header}>Edit Profile</span>
			<button type="submit" form="profile-form" className={styles.button}>
				<Tick className={styles.button_img} />
			</button>
		</div>
	);
}
