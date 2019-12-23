import React from 'react';
import Form from './components/Form';
import PrevElem from './components/PrevElem';

import styles from './styles/AppStyles.module.css';

const API_KEY = '89761661ac666a6c40bbd7993e97d526';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?q=';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prevElems: [],
		};

		this.getWeather = this.getWeather.bind(this);
	}

	getWeather(event) {
		event.preventDefault();
		const cityName = event.target.elements.city.value;
		if (cityName) {
			fetch(`${BASE_URL}${cityName}&appid=${API_KEY}&units=metric`)
				.then((response) => response.json())
				.then((data) => {
					const list = this.state.prevElems.concat(
						<PrevElem
							key={this.state.prevElems.length}
							cityName={data.name}
							windDirection={data.wind.deg}
							windSpeed={data.wind.speed}
							humidity={data.main.humidity}
							temp={Math.round(data.main.temp)}
						/>,
					);
					this.setState({
						prevElems: list,
					});
				});
		}
	}

	render() {
		return (
			<React.Fragment>
				<Form handleSubmit={this.getWeather} />
				<div className={styles.app_container}>{this.state.prevElems}</div>
			</React.Fragment>
		);
	}
}

export default App;
