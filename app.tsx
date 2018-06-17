import * as dom from "dom";
import { CollapsibleSection } from "./sections";
import { about, heart } from "./style.css";

async function defaultComponent<PropsType>(modulePromise: Promise<{ default: dom.ComponentFactory<PropsType> }>, props: PropsType) {
	return dom.h((await modulePromise).default, props);
}

export default <div>
	<h1>Mobius Sample App</h1>
	<CollapsibleSection title="To Do List" contents={() => defaultComponent(import("./todo"), {})}>Loading...</CollapsibleSection>
	<CollapsibleSection title="Random Stream" contents={() => defaultComponent(import("./random"), {})}>Loading...</CollapsibleSection>
	<CollapsibleSection title="Messaging" contents={() => defaultComponent(import("./messaging"), {})}>Loading...</CollapsibleSection>
	<CollapsibleSection title="Weather" contents={() => defaultComponent(import("./weather"), {})}>Loading...</CollapsibleSection>
	<CollapsibleSection title="Session Sharing" contents={() => defaultComponent(import("./sharing"), {})}>Loading...</CollapsibleSection>
	<div class={about}>made with <svg class={heart} viewBox="0 0 32 29.6"><title>love</title><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg> by <a href="https://twitter.com/rpetrich/">@rpetrich</a></div>
</div>

dom.title("Mobius Sample App");

// Log current time
console.log("Date.now()", Date.now());
console.log("new Date()", new Date().toString());
console.log("Math.random", Math.random());
