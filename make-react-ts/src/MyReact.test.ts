import { test, expect } from "vitest";
import { createTextElement, createElement } from "./MyReact";

test('createTextElement', () => {
    expect(createTextElement("Hello, World!"))
        .toStrictEqual({
            type: "TEXT_ELEMENT",
            props: {
                nodeValue: "Hello, World!",
                children: [],
            }
        });
});

test('createElement div', () => {
    expect(createElement('div', { className: 'container' }, 'Hello, World!'))
        .toStrictEqual({
            type: "div",
            props: {
                className: 'container',
                children: [ createTextElement('Hello, World!') ]
            },
        });
});