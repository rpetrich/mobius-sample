import * as dom from "dom";

export class RandomWidget extends dom.Component<{}, { value: string }> {
	constructor(props: any, context: any) {
		super(props, context);
		console.log("Generating random numbers");
		this.state = { value: "" };
		this.updateRandom();
	}
	updateRandom = () => {
		let value = Math.random();
		console.log(value);
		this.setState({ value: value.toString() });
	}
	interval = setInterval(this.updateRandom, 1000);
	render() {
		return <span>So random: <span>{this.state.value}</span></span>;
	}
	componentWillUnmount() {
		console.log("Destroying random stream");
		clearInterval(this.interval);
	}
}
