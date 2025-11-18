import { test, expect } from "vitest";
import { createTextElement } from "./MyReact";

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