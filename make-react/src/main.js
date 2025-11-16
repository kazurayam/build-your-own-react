function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) =>
                typeof child === "object" ? child: createTextElement(child)
            )
        },
    };
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

const element = createElement("h1", {title: "foo"}, "Hello");
console.log(element)

// idがrootの要素を取得
const container = document.getElementById("root");

// 新しい要素を作成(h1)
const node = document.createElement("h1");

// テキストノードを作成(Hello World!)
const text = document.createTextNode("Hello World!")

// テキストノードをh1要素に追加
node.appendChild(text);

// h1要素をroot要素に追加
container.appendChild(node);

// ReactDOM.render(element, container);
