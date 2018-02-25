import * as dom from "dom";

export class ErrorBoundary extends dom.Component<{}, { error?: string }> {
	componentWillReceiveProps(nextProps: any) {
		if (nextProps.children) {
			this.setState({ error: undefined });
		}
	}
	componentDidCatch(error: any) {
		this.setState({ error: error + "" });
	}
	render() {
		if (this.state.error) {
			return <div>{this.state.error}</div>
		} else {
			return <div>{this.props.children}</div>
		}
	}
}
