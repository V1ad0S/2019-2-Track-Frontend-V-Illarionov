import React from 'react';
import styles from '../styles/editProfileStyles.module.scss';

import { ReactComponent as ProfileSvg } from '../images/edit_profile_img.svg';

export default function EditProfile(props) {
	function handleSubmit(event) {
		event.preventDefault();
	}

	function handleInvalid(event) {
		event.target.setCustomValidity(
			'Username should only contain at least 5 lowercase letters and digits. e.g. john123',
		);
	}

	return (
		<form
			id="profile-form"
			className={styles.profile_form}
			onSubmit={handleSubmit}
		>
			<div className={styles.profile_img_preview}>
				<ProfileSvg className={styles.profile_img} />
			</div>
			<div
				className={`${styles.profile_input_div} ${styles.fullname_input_div}`}
			>
				<span className={styles.field_info}>Full name</span>
				<input className={styles.profile_input} />
			</div>
			<div
				className={`${styles.profile_input_div} ${styles.username_input_div}`}
			>
				<span className={styles.field_info}>Username</span>
				<input
					className={styles.profile_input}
					pattern="^[a-z][a-z0-9-_\.]{4,20}$"
					onInvalid={handleInvalid}
				/>
			</div>
			<div
				className={`${styles.profile_input_div} ${styles.biography_input_div}`}
			>
				<span className={styles.field_info}>Bio</span>
				<textarea className={styles.profile_input} />
			</div>
		</form>
	);
}
