import { test, expect } from "vitest";
import { createElement, createTextElement } from "./MyReact";

test('createTextElement', () => {
    expect(createTextElement("Hello, World!"))
        .toStrictEqual({
            type: 'TEXT_ELEMENT',
            props: {
                nodeValue: "Hello, World!",
                children: [],
            }
        })
});

test('createElement', () => {
    expect(createElement("h1", { title: "foo" }, "Hello"))
        .toStrictEqual({
            type: "h1",
            props: {
                title: "foo",
                children: [
                    {
                        type: "TEXT_ELEMENT",
                        props: {
                            nodeValue: "Hello",
                            children: []
                        }
                    }
                ],
            },
        });
});