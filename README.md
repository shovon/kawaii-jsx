# Kawaii: a dumb little JSX front-end library, purely created for educational purposes

I wrote this to teach myself on how React and other JSX library work behind the scenes.

## Usage

First, you will need a bundler that doesn't exclusively work with React. Unfortunately, how to configure it is beyond the scope of this README file, since every bundler has their own way of converting JSX to JavaSript.

That said, there are some tutorials on how to do that.

- [Use Vite for JSX without React](https://davidmold.medium.com/use-vite-for-jsx-without-react-e59aed9460f5))
- [How to create your own Babel processor alternative to `React`](https://stackoverflow.com/a/57126017/538570)

Next, you can just use it like any other JSX-based library.

```typescript
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
```
