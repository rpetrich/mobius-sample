import * as dom from "dom";
import { shareSession } from "mobius";

export class SharingWidget extends dom.Component<{}, { url?: string, error?: any }> {
	async componentWillMount() {
		try {
			this.setState({ url: await shareSession() });
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

