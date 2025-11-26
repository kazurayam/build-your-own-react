// MyReact.ts

export type MyTextElement = {
    type: "TEXT_ELEMENT",
    props: {
        nodeValue: string,
        children: [],
    }
}

export const createTextElement = (text: string) : MyTextElement => {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}
