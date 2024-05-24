import "./style.css";
import { useState } from "./lib/kawai.ts";

function Counter() {
	const [value, setState] = useState(0);
	return (
		<div>
			<button
				onClick={() => {
					setState(value + 1);
				}}
			>
				Increment
			</button>{" "}
			{`${value}`}
		</div>
	);
}

document.querySelector<HTMLDivElement>("#app")!.appendChild(<Counter />);
