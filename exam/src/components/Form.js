import React from 'react';
import PropTypes from 'prop-types';

export default function Form(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<input type="text" name="city" placeholder="Enter your city" />
			<button type="submit">Show Weather</button>
		</form>
	);
}

Form.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};
