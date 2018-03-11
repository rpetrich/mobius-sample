import * as dom from "dom";
import { Channel } from "mobius-types";
import { topic, receive, send } from "broadcast";
import { TextField } from "./form";

const messagesTopic = topic<string>("messages");

class ReceiveWidget extends dom.Component<{}, { messages: string[] }> {
	constructor(props: any, context: any) {
		super(props, context);
		console.log("Receiving messages");
		this.state = { messages: [] };
	}
	receiveChannel: Channel = receive(messagesTopic, value => {
		console.log("Received: " + value);
		this.setState({ messages: [value as string].concat(this.state.messages) });
	});
	render() {
		const messages = this.state.messages;
		return <span>{messages.length > 0 ? messages.map(message => <div>{message}</div>) : "No Messages"}</span>;
	}
	componentWillUnmount() {
		console.log("Destroying message stream");
		this.receiveChannel.close();
	}
}

class BroadcastWidget extends dom.Component<{}, { value: string }> {
	constructor(props: any, context: any) {
		super(props, context);
		this.state = { value: "" };
	}
	render() {
		return (
			<div>
				<TextField value={this.state.value} onChange={this.updateValue.bind(this)} onEnter={this.send.bind(this)}/>
				<button onClick={this.send.bind(this)}>Send</button>
			</div>
		);
	}
	updateValue(value: string) {
		this.setState({ value });
	}
	send() {
		send(messagesTopic, this.state.value);
	}
}

export default function() {
	return <div>
		<BroadcastWidget/>
		<ReceiveWidget/>
	</div>
}
