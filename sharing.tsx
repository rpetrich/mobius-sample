import * as dom from "dom";
import { share } from "peers";

export default class extends dom.Component<{}, { url?: string }> {
	async componentWillMount() {
		this.setState({ url: await share() });
	}
	render() {
		if (this.state.url) {
			return <a href={this.state.url} target="_blank">Share</a>;
		}
		return <span>Loading...</span>;
	}
}

