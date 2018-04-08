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
