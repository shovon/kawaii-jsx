type Renderer = (props: unknown) => Element;

let currentRendererAndParent: null | {
	renderer: () => Element;
	node: Element;
	// parent: Element;
} = null;
const stateMapping = new WeakMap<object, unknown>();

export function useState<T>(initialValue: T): [T, (value: T) => void] {
	if (currentRendererAndParent === null) {
		throw new Error("useState called outside of a functional component");
	}

	const obj = {};
	stateMapping.set(obj, initialValue);

	return [
		initialValue,
		(
			({ renderer, node }, reference) =>
			(value: T) => {
				stateMapping.set(reference, value);

				const newNode = renderer();
				node.replaceWith(newNode);
			}
		)(currentRendererAndParent, obj),
	];
}

export function create(
	node: Renderer | string,
	props: unknown,
	...children: unknown[]
): Element {
	if (children.length === 1 && Array.isArray(children[0])) {
		children = children[0];
	}
	switch (typeof node) {
		case "function":
			// We're dealing with a function, and the function will return a DOM
			// node.
			//
			// But not too fast!
			//
			// The function also introduces side effects that could trigger a
			// a re-render.
			//
			// This happens through a setState update.
			return ((newProps) => {
				const domNodeRetriever = () => {
					return node(newProps);
				};
				const element = domNodeRetriever();
				currentRendererAndParent = {
					renderer: domNodeRetriever,
					node: element,
					// parent: element,
				};
				return element;
			})({ ...(props ?? {}), children });
		case "string":
			const toReturn = document.createElement(node);
			for (const child of children) {
				switch (typeof child) {
					case "string":
						toReturn.appendChild(document.createTextNode(child));
						break;
					case "object":
						if (child instanceof Element) {
							toReturn.appendChild(child);
							break;
						} else {
							throw new Error("Unknown child element type");
						}
					default:
						throw new Error(`Unknown children type ${typeof children}`);
				}
			}
			return toReturn;
		default:
			throw new Error(`Unknown typeo of node ${typeof node}`);
	}
}

export function Fragment(value: unknown) {
	// console.log(value);
	console.log(value);
}
