// MyReact.test.ts

import { describe, beforeEach, test, expect } from "vitest";
import { createElement, createTextElement, createDom } from "./MyReact";

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

describe('createElement', () => {
    test('case of text as sole child', () => {
        // https://qiita.com/Sicut_study/items/710ea707d4426011710f
        // "2. ReactをJavaScriptに置き換えてみる"
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
    test('case of composite children', () => {
        const result = 
            createElement(
                "ul", 
                { id: "my-list"}, 
                createElement('li', null, "項目1"),
                createElement('li', null, "項目2"),
                "テキストノード",
                123
            );
        //console.log(result);
        expect(result.type).toBe('ul');
        expect(result.props.id).toBe('my-list');
        expect(result.props.children.length).toBe(4);
        //
        expect(result.props.children[0].type).toBe('li')
        //
        expect(result.props.children[1].type).toBe('li')
        //
        expect(result.props.children[2].type).toBe('TEXT_ELEMENT')
        expect(result.props.children[2].props.nodeValue).toBe('テキストノード')
        expect(result.props.children[2].props.children).toEqual([])
        //
        expect(result.props.children[3].type).toBe('TEXT_ELEMENT')
        expect(result.props.children[3].props.nodeValue).toBe(123)
        expect(result.props.children[3].props.children).toEqual([])
    });
});


describe('index.htmlにroot要素が与えられてあること', () => {
    beforeEach(() => {
        // Reset DOM before each test
        document.body.innerHTML = '';
        // Insert <div id="root"></div> into the empty document
        const rootElement = document.createElement('div')
        rootElement.id = 'root'
        document.body.appendChild(rootElement)
    });
    test('', () => {
        const container = document.getElementById('root');
        expect(container).not.toBeNull();
    });
});

