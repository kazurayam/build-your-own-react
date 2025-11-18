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

// renderをcreateDomという関数に変更
function createDom(fiber) {
    const dom =
        fiber.type == "TEXT_ELEMENT"
            ? document.createTextNode(fiber.props.nodeValue)
            : document.createElement(fiber.type);
    
    const isProperty = (key) => key !== "children";
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach((name) => {
            dom[name] = fiber.props[name];
        });
    
    return dom;
}

function commitRoot() {
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}

function commitWork(fiber) {
    if (!fiber) {
        return;
    }
    const domParent = fiber.parent.dom;
    domParent.appendChild(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        }
    };
    nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining < 1;
    }
    requestIdleCallback(workLoop);

    // 作業すべきFiberが無くなったら一気にレンダリングする
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
}

requestIdleCallback(workLoop);

// Fiber作成の流れ
function performUnitOfWork(fiber) {
    // 1. DOMを生成する
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }

    // 2. Fiberノードを作成する
    const elements = fiber.props.children;  // 子要素の配列を取得
    let index = 0;
    let prevSibling = null;     // 前の兄弟要素を追跡

    while(index < elements.lendth) {
        const element = elements[index];

        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        };

        if (index === 0) {
            fiber.child = newFiber;     // 最初の子
        } else {
            prevSibling.sibling = newFiber;     // 兄弟としてつなげる
        }

        prevSibling = newFiber;
        index++;
    }
    
    // 3. 次の単位作業を返す
    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while(nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}

const MyReact = {
    createElement,
    render,
}

export default MyReact;
