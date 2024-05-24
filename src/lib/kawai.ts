type Renderer = (props: unknown) => Element;

let currentRendererAndParent: null | {
	renderer: () => Element;
	node?: Element;
	// parent: Element;
} = null;
const stateMapping = new WeakMap<object, unknown>();

export function useState<T>(initialValue: T): [T, (value: T) => void] {
	if (currentRendererAndParent === null) {
		return [initialValue, () => {}];
	}

	if (!stateMapping.has(currentRendererAndParent)) {
		stateMapping.set(currentRendererAndParent, initialValue);
	}
	let currentValue = stateMapping.get(currentRendererAndParent);

	return [
		currentValue as T,
		((reference) => (value: T) => {
			stateMapping.set(reference, value);

			const newNode = reference.renderer();
			console.log(reference.node);
			reference?.node?.replaceWith(newNode);
			reference.node = newNode;
		})(currentRendererAndParent),
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
			return ((newProps) => {
				const domNodeRetriever = () => {
					return node(newProps);
				};
				currentRendererAndParent = {
					renderer: domNodeRetriever,
					// node: element,
					// parent: element,
				};
				const element = domNodeRetriever();
				currentRendererAndParent.node = element;
				return element;
			})({ ...(props ?? {}), children });
		case "string":
			const toReturn = document.createElement(node);

			if (!!props) {
				const p = props as { onClick?: unknown };
				if (typeof p.onClick === "function") {
					const onClick = p.onClick;
					toReturn.addEventListener("click", () => {
						onClick();
					});
				}
			}

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
