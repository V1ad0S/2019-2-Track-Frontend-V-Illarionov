import React from 'react';
import { Link } from 'react-router-dom';
import headerStyles from '../styles/appHeaderStyles.module.css';

export default function ProfileHeader(props) {
	return (
		<div className={headerStyles.app_header}>
			<Link to="/" className={headerStyles.button}>
				<svg
					className={headerStyles.button_img}
					x="0px"
					y="0px"
					width="408px"
					height="408px"
					viewBox="0 0 408 408"
				>
					<path d="M408,178.5H96.9L239.7,35.7L204,0L0,204l204,204l35.7-35.7L96.9,229.5H408V178.5z" />
				</svg>
			</Link>
			<span className={headerStyles.header}>Edit Profile</span>
			<button
				type="submit"
				form="profile-form"
				className={`${headerStyles.button_search_chatlist} ${headerStyles.button}`}
			>
				<svg
					className={headerStyles.button_img}
					x="0px"
					y="0px"
					width="408px"
					height="408px"
					viewBox="0 0 408 408"
					style={{ fill: 'currentColor' }}
				>
					<polygon points="142.8,323.85 35.7,216.75 0,252.45 142.8,395.25 448.8,89.25 413.1,53.55" />
				</svg>
			</button>
		</div>
	);
}
