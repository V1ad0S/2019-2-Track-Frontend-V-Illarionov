import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/formInputStyles.module.css';

export default function FormInput(props) {
	return (
		<div className={styles.form_input}>
			<input
				className={styles.input}
				type="text"
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
			<button
				type="button"
				className={styles.attach_button}
				onClick={props.attachFunc}
			>
				<svg
					className={styles.attach_button_img}
					x="0px"
					y="0px"
					width="5vh"
					height="5vh"
					viewBox="0 0 510 510"
				>
					<path
						d="M140.25,395.25C63.75,395.25,0,331.5,0,255s63.75-140.25,140.25-140.25H408c56.1,0,102,45.9,102,102
					  c0,56.1-45.9,102-102,102H191.25c-35.7,0-63.75-28.05-63.75-63.75s28.05-63.75,63.75-63.75H382.5v38.25H191.25
					  c-15.3,0-25.5,10.2-25.5,25.5s10.2,25.5,25.5,25.5H408c35.7,0,63.75-28.05,63.75-63.75S443.7,153,408,153H140.25
					  c-56.1,0-102,45.9-102,102c0,56.1,45.9,102,102,102H382.5v38.25H140.25z"
					/>
				</svg>
			</button>
			<button
				type="submit"
				className={styles.submit_button}
				style={{ display: props.submitButtonDisplayStyle }}
			>
				<svg
					className={styles.submit_button_img}
					x="0px"
					y="0px"
					width="5vh"
					height="5vh"
					viewBox="0 0 448 448"
				>
					<polygon points="0.213,32 0,181.333 320,224 0,266.667 0.213,416 448,224" />
				</svg>
			</button>
		</div>
	);
}

FormInput.propTypes = {
	submitButtonDisplayStyle: PropTypes.string.isRequired,
	attachFunc: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};
