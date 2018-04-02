import * as dom from "dom";
import { CollapsibleSection } from "./sections";
import { about, heart } from "./style.css";

async function defaultComponent<PropsType>(modulePromise: Promise<{ default: dom.ComponentFactory<PropsType> }>, props: PropsType) {
	return dom.h((await modulePromise).default, props);
}

dom.host((
	<div>
		<h1>Mobius Sample App</h1>
		<CollapsibleSection title="To Do List" contents={() => defaultComponent(import("./todo"), {})}/>
		<CollapsibleSection title="Random Stream" contents={() => defaultComponent(import("./random"), {})}/>
		<CollapsibleSection title="Messaging" contents={() => defaultComponent(import("./messaging"), {})}/>
		<CollapsibleSection title="Session Sharing" contents={() => defaultComponent(import("./sharing"), {})}/>
		<div class={about}>made with <span class={heart}>♥️</span> by <a href="https://twitter.com/rpetrich/">@rpetrich</a></div>
	</div>
));

dom.title("Mobius Sample App");

// Log current time
console.log("Date.now()", Date.now());
console.log("new Date()", new Date().toString());
console.log("Math.random", Math.random());
