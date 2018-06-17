import * as dom from "dom";
import { parse, fromClient as fetchFromClient } from "fetch";
import { WeatherResponse as isWeatherResponse } from "./weather!validators";

export default class extends dom.Component<{}, { text: string }> {
	async componentDidMount() {
		const url = "https://query.yahooapis.com/v1/public/yql?format=json&q=" + encodeURIComponent("SELECT * FROM weather.forecast WHERE woeid = 2459115");
		const channel = parse(await fetchFromClient(url), isWeatherResponse).query.results.channel;
		const temp = channel.item.condition.temp;
		const unit = channel.units.temperature;
		const condition = channel.item.condition.text;
		this.setState({ text: `${temp}°${unit} and ${condition} in NYC` });
	}
	render() {
		return <span>{this.state.text || "Loading..."}</span>;
	}
}

export interface WeatherResponse {
	query: {
		count: number;
		created: string;
		lang: string;
		results: {
			channel: {
				astronomy: {
					sunrise: string;
					sunset: string;
				};
				atmosphere: {
					humidity: string;
					pressure: string;
					rising: string;
					visibility: string;
				};
				description: string;
				image: {
					height: string;
					link: string;
					title: string;
					url: string;
					width: string;
				};
				item: {
					condition: {
						code: string;
						date: string;
						temp: string;
						text: string;
					};
					description: string;
					forecast: {
						code: string;
						date: string;
						day: string;
						high: string;
						low: string;
					}[];
					guid: {
						isPermaLink: string;
					};
					lat: string;
					link: string;
					long: string;
					pubDate: string;
					title: string;
				};
				language: string;
				lastBuildDate: string;
				link: string;
				location: {
					city: string;
					country: string;
					region: string;
				};
				title: string;
				ttl: string;
				units: {
					distance: string;
					pressure: string;
					speed: string;
					temperature: string;
				};
				wind: {
					chill: string;
					direction: string;
					speed: string;
				};
			};
		};
	};
}
