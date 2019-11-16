import React from 'react';
import styles from '../styles/editProfileStyles.module.css';

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
				<svg
					className={styles.profile_img}
					x="0px"
					y="0px"
					width="548.165px"
					height="548.165px"
					viewBox="0 0 548.165 548.165"
				>
					<path
						d="M526.76,131.045c-14.277-14.274-31.498-21.413-51.675-21.413h-63.953l-14.558-38.826
						c-3.618-9.325-10.229-17.368-19.846-24.128c-9.613-6.757-19.462-10.138-29.551-10.138H200.996
						c-10.088,0-19.939,3.381-29.552,10.138c-9.613,6.76-16.225,14.803-19.842,24.128l-14.56,38.826H73.089
						c-20.179,0-37.401,7.139-51.678,21.413C7.137,145.32,0,162.544,0,182.721v255.813c0,20.178,7.137,37.404,21.411,51.675
						c14.277,14.277,31.5,21.416,51.678,21.416h401.989c20.177,0,37.397-7.139,51.675-21.416
						c14.273-14.271,21.412-31.497,21.412-51.675V182.721C548.169,162.544,541.03,145.32,526.76,131.045z M364.446,400.993
						c-25.029,25.03-55.147,37.548-90.362,37.548s-65.331-12.518-90.362-37.548c-25.031-25.026-37.544-55.151-37.544-90.358
						c0-35.218,12.517-65.333,37.544-90.364c25.028-25.031,55.148-37.544,90.362-37.544s65.333,12.516,90.362,37.544
						c25.03,25.028,37.545,55.146,37.545,90.364C401.991,345.842,389.477,375.964,364.446,400.993z"
					/>
					<path
						d="M274.084,228.403c-22.651,0-42.018,8.042-58.102,24.128c-16.084,16.084-24.126,35.448-24.126,58.104
						c0,22.647,8.042,42.014,24.126,58.098c16.084,16.081,35.45,24.123,58.102,24.123c22.648,0,42.017-8.042,58.101-24.123
						c16.084-16.084,24.127-35.45,24.127-58.098c0-22.655-8.043-42.019-24.127-58.104C316.102,236.446,296.732,228.403,274.084,228.403
						z"
					/>
				</svg>
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