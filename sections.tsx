import * as dom from "dom";
import { activeSection, inactiveSection } from "./style.css";
import { ErrorBoundary } from "./error";

interface CollapsibleSectionProps {
	title: string;
	contents?: () => JSX.Element | Promise<JSX.Element>;
}

export class CollapsibleSection extends dom.Component<CollapsibleSectionProps, { visible?: boolean, contents?: JSX.Element }> {
	async updateContents(load: () => JSX.Element | Promise<JSX.Element>) {
		this.setState({ contents: undefined });
		const contents = await load();
		if (load === this.props.contents) {
			this.setState({ contents });
		}
	}
	componentWillReceiveProps(nextProps: Partial<CollapsibleSectionProps>) {
		if (this.state.visible) {
			const contents = nextProps.contents;
			if (contents) {
				this.updateContents(contents);
			}
		}
	}
	render() {
		if (this.state.visible) {
			return <div>
				<h2 class={activeSection}>
					<button onClick={() => this.setState({ visible: false })}>{this.props.title}</button>
				</h2>
				<ErrorBoundary>{this.state.contents || <div>{this.props.children}</div>}</ErrorBoundary>
			</div>
		} else {
			return <div>
				<h2 class={inactiveSection}>
					<button onClick={() => {
						this.setState({ visible: true });
						if (!this.state.contents && this.props.contents) {
							this.updateContents(this.props.contents);
						}
					}}>{this.props.title}</button>
				</h2>
			</div>
		}
	}
}
