// MyReact.ts

export type ReactElement = {
    type: string,
    props: {
        nodeValue?: string,
        children: Array<ReactElement>,
        key?: string,
        ref?: string,
    }
}

export type Fiber = {
    type: "Counter",
    props: {
        initial: number,
        children: Array<any>,
    },
    dom: "DOM" | null,
    // ツリー構造
    parent: Fiber,
    child: Fiber,
    sibling: Fiber | null,
    alternate: Fiber | null,
    // 副作用タグ
    effectTag: 'UPDATE'
}

export const createTextElement = (text: string) : ReactElement => {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

export const createElement = (type: string, props: Object, ...children: any) : ReactElement => {
    return {
        type,
        props: {
            ...props,
            children: children.map((child: any) =>
                typeof child === "object" ? child: createTextElement(child)
            )
        },
    };
}