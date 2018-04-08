import * as dom from "dom";
import { fromClient as fetchFromClient } from "fetch";
import { FetchResponse } from "fetch-types";
import { WeatherResponse as isWeatherResponse } from "./yahoo!validators";

function parseResponseAsJson<T>(response: FetchResponse, validator: (value: any) => value is T): T {
	if (!response.ok) {
		throw new Error("Response from fetch is an error");
	}
	const value = JSON.parse(response.text);
	if (validator(value)) {
		return value;
	}
	throw new Error("Value did not validate to the expected schema: " + response.text);
}

export default class extends dom.Component<{}, { text: string }> {
	async componentDidMount() {
		try {
			const url = "https://query.yahooapis.com/v1/public/yql?format=json&q=" + encodeURIComponent("SELECT * FROM weather.forecast WHERE woeid = 2459115");
			const channel = parseResponseAsJson(await fetchFromClient(url), isWeatherResponse).query.results.channel;
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
