import * as dom from "dom";

export class TextField extends dom.Component<{ value: string, placeholder?: string, onChange: (value: string) => void, onEnter: () => void }, { value: string }> {
	onChange(event: any) {
		this.props.onChange(typeof event.value === "string" ? event.value : "");
	}
	onKeyPress(event: any) {
		if (event.keyCode == 13 && this.props.onEnter) {
			this.props.onEnter();
		}
	}
	render() {
		return <input placeholder={this.props.placeholder || ""} value={this.props.value} onChange={this.onChange.bind(this)} onInput={this.onChange.bind(this)} onKeyPress={this.props.onEnter ? this.onKeyPress.bind(this) : undefined}/>
	}
}
