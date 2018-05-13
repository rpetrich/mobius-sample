import * as dom from "dom";
import { share } from "peers";

export default class extends dom.Component<{}, { url?: string, error?: any }> {
	async componentWillMount() {
		try {
			this.setState({ url: await share() });
		} catch (error) {
			this.setState({ error });
		}
	}
	render() {
		if (this.state.error) {
			return <span>{this.state.error.toString()}</span>;
		}
		if (this.state.url) {
			return <a href={this.state.url} target="_blank">Share</a>;
		}
		return <span>Loading...</span>;
	}
}

