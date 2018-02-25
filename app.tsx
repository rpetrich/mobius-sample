import * as dom from "dom";
import { CollapsibleSection } from "./sections";

dom.host((
	<div>
		<h1>Mobius Sample App</h1>
		<CollapsibleSection title="To Do List" contents={() => import("./todo").then(todo => <todo.ToDoWidget/>)}/>
		<CollapsibleSection title="Random Stream" contents={() => import("./random").then(random => <random.RandomWidget/>)}/>
		<CollapsibleSection title="Messaging" contents={() => import("./messaging").then(messaging => <messaging.MessagingWidget/>)}/>
		<CollapsibleSection title="Session Sharing" contents={() => import("./sharing").then(sharing => <sharing.SharingWidget/>)}/>
		<div class="about">made with <span class="heart">♥️</span> by <a href="https://twitter.com/rpetrich/">@rpetrich</a></div>
	</div>
));

dom.style("style.css");

// Log current time
console.log("Date.now()", Date.now());
console.log("new Date()", new Date().toString());
console.log("Math.random", Math.random());
