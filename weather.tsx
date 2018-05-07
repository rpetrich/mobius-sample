import * as dom from "dom";
import { parse, fromClient as fetchFromClient } from "fetch";
import { WeatherResponse as isWeatherResponse } from "./yahoo!validators";

export default class extends dom.Component<{}, { text: string }> {
	async componentDidMount() {
		try {
			const url = "https://query.yahooapis.com/v1/public/yql?format=json&q=" + encodeURIComponent("SELECT * FROM weather.forecast WHERE woeid = 2459115");
			const channel = parse(await fetchFromClient(url), isWeatherResponse).query.results.channel;
			const temp = channel.item.condition.temp;
			const unit = channel.units.temperature;
			const condition = channel.item.condition.text;
			this.setState({ text: `${temp}°${unit} and ${condition} in NYC` });
		} catch (e) {
			this.setState({ text: `Error: ${e}` });
		}
	}
	render() {
		return <span>{this.state.text || "Loading..."}</span>;
	}
}
