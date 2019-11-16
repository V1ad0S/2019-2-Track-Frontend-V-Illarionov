import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/formInputStyles.module.css';

import { ReactComponent as AttachSvg } from '../images/forminput_buttons/attach_button.svg';
import { ReactComponent as SubmitSvg } from '../images/forminput_buttons/submit_button.svg';

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
				<AttachSvg className={styles.attach_button_img} />
			</button>
			<button
				type="submit"
				className={styles.submit_button}
				style={{ display: props.submitButtonDisplayStyle }}
			>
				<SubmitSvg className={styles.submit_button_img} />
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
