import { Channel, JsonMap } from "mobius-types";
import * as dom from "dom";
import { execute, sql } from "sql";
import { db } from "secrets";
import { topic, receive, send } from "broadcast";
import { TextField } from "./form";
import { saveDirty, saveClean } from "./style.css";

type DbRecord = { id: number };
type DbRecordChange<T extends DbRecord> = JsonMap & {
	operation: "create" | "modify" | "delete";
	record: T;
};

function updatedRecordsFromChange<T extends DbRecord>(items: T[], message: DbRecordChange<T>) {
	switch (message.operation) {
		case "create": {
			let found = false;
			items = items.map(item => {
				if (item.id == message.record.id) {
					found = true;
					return message.record;
				}
				return item;
			});
			if (!found) {
				items.unshift(message.record);
			}
			return items;
		}
		case "modify":
			return items.map(item => item.id == message.record.id ? message.record : item);
		case "delete":
			return items.filter(item => item.id != message.record.id);
	}
}

type Item = DbRecord & { text: string };
const itemChanges = topic<DbRecordChange<Item>>("item-changes");

class NewItemWidget extends dom.Component<{}, { value: string }> {
	constructor(props: any, context: any) {
		super(props, context);
		this.state = { value: "" };
	}
	render() {
		return (
			<div>
				<TextField placeholder="New Item" value={this.state.value} onChange={this.onChange.bind(this)} onEnter={this.send.bind(this)} />
				<button onClick={this.send.bind(this)}>Add</button>
			</div>
		);
	}
	onChange(value: string) {
		this.setState({ value });
	}
	async send() {
		try {
			await execute(db, sql`INSERT INTO mobius_todo.items (text) VALUES (${this.state.value})`);
			// Syntax to get the newly inserted row is different between MySQL and Postgres, using this fallback instead
			const result = await execute(db, sql`SELECT MAX(id) as id FROM mobius_todo.items`);
			const message: DbRecordChange<Item> = {
				operation: "create",
				record: { id: result[0].id as number, text: this.state.value }
			};
			send(itemChanges, message);
			this.setState({ value: "" });
		} catch (e) {
			console.log(e);
		}
	}
}

class ItemWidget extends dom.Component<{ item: Item }, { pendingText: string | undefined, inProgress: boolean }> {
	constructor(props: any, context: any) {
		super(props, context);
		this.state = { pendingText: undefined, inProgress: false };
	}
	render() {
		return (
			<div key={this.props.item.id}>
				<TextField value={typeof this.state.pendingText != "undefined" ? this.state.pendingText : this.props.item.text} onChange={this.setPendingText.bind(this)} onEnter={this.save.bind(this)}/>
				<button onClick={this.save.bind(this)} class={typeof this.state.pendingText != "undefined" ? saveDirty : saveClean} disabled={this.state.inProgress}>Save</button>
				<button onClick={this.delete.bind(this)} disabled={this.state.inProgress}>Delete</button>
			</div>
		);
	}
	setPendingText(pendingText: string) {
		this.setState({ pendingText : pendingText != this.props.item.text ? pendingText : undefined })
	}
	async save() {
		if (typeof this.state.pendingText != "undefined") {
			try {
				this.setState({ inProgress: true });
				await execute(db, sql`UPDATE mobius_todo.items SET text = ${this.state.pendingText} WHERE id = ${this.props.item.id}`);
				send(itemChanges, {
					operation: "modify",
					record: { id: this.props.item.id, text: this.state.pendingText }
				} as DbRecordChange<Item>);
				this.setState({ pendingText: undefined, inProgress: false });
			} catch (e) {
				console.log(e);
			}
		}
	}
	async delete() {
		this.setState({ inProgress: true });
		await execute(db, sql`DELETE FROM mobius_todo.items WHERE id = ${this.props.item.id}`);
		send(itemChanges, {
			operation: "delete",
			record: this.props.item
		} as DbRecordChange<Item>);
		this.setState({ inProgress: false });
	}
}

class ItemsWidget extends dom.Component<{}, { items: Item[], message: string | undefined }> {
	constructor(props: any, context: any) {
		super(props, context);
		this.state = { items: [], message: "Loading..." };
	}
	render() {
		return <div>{typeof this.state.message != "undefined" ? this.state.message : this.state.items.map(item => <ItemWidget item={item}/>)}</div>;
	}
	receiveChannel?: Channel;
	async componentWillMount() {
		this.receiveChannel = receive(itemChanges, change => {
			this.setState({ items: updatedRecordsFromChange(this.state.items, change) });
		});
		try {
			const items = await execute(db, sql`SELECT id, text FROM mobius_todo.items ORDER BY id DESC`, record => record as Item);
			this.setState({ items, message: undefined });
		} catch (e) {
			this.setState({ message: e.toString() });
		}
	}
	componentWillUnmount() {
		if (this.receiveChannel) {
			this.receiveChannel.close();
		}
	}
}

export default function() {
	return <div>
		<NewItemWidget/>
		<ItemsWidget/>
	</div>;
}
