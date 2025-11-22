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
    test('case of text as the sole child', () => {
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
        //
        //console.log(JSON.stringify(result, null, 2));
        /*
        {
  "type": "ul",
  "props": {
    "id": "my-list",
    "children": [
      {
        "type": "li",
        "props": {
          "children": [
            {
              "type": "TEXT_ELEMENT",
              "props": {
                "nodeValue": "項目1",
                "children": []
              }
            }
          ]
        }
      },
      {
        "type": "li",
        "props": {
          "children": [
            {
              "type": "TEXT_ELEMENT",
              "props": {
                "nodeValue": "項目2",
                "children": []
              }
            }
          ]
        }
      },
      {
        "type": "TEXT_ELEMENT",
        "props": {
          "nodeValue": "テキストノード",
          "children": []
        }
      },
      {
        "type": "TEXT_ELEMENT",
        "props": {
          "nodeValue": 123,
          "children": []
        }
      }
    ]
  }
}
        */
        //
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


describe('root要素を持ったdocumentの作り方を試す', () => {
    beforeEach(() => {
        // Reset DOM before each test
        document.body.innerHTML = '';
        // Insert <div id="root"></div> into the empty document
        const rootElement = document.createElement('div')
        rootElement.id = 'root'
        document.body.appendChild(rootElement)
    });
    test('if the <div id="root"> element is there', () => {
        const container = document.getElementById('root');
        expect(container).not.toBeNull();
    });
});

describe('createDom', () => {
    beforeEach(() => {
        // Reset DOM before each test
        document.body.innerHTML = '';
        // Insert <div id="root"></div> into the empty document
        const rootElement = document.createElement('div')
        rootElement.id = 'root'
        document.body.appendChild(rootElement)
    });
    test('<ul id="my-list">', () => {
        const fiber = 
            createElement(
                "ul", 
                { id: "my-list"}, 
                createElement('li', null, "項目1"),
                createElement('li', null, "項目2"),
                "テキストノード",
                123
            );
        //console.log("fiber:\n" + JSON.stringify(fiber, null, 2))
        const dom = createDom(fiber);
        console.log("dom:\n" + JSON.stringify(domToJSON(dom), null, 2));
        expect(dom).not.toBeNull();
    });
});

/**
 * DOM要素をJSON.stringify()に渡しても {} が返ってくる。
 * JSON.stringify()はDOM要素を直にJSON化できるようには設計されていないから。
 * DOM要素をJavaScript Objectに変換する関数をカスタムに実装することが必要だ。
 * DOM要素をJavaScript Objectに変換したあとでそのObjectをJSON.stringifyに渡せ。
 * @param el 
 */
const domToJSON = (el: Element): Object => {
    return {
        tag: el.tagName,
        attributes: Array.from(el.attributes).map(attr => ({
            name: attr.name,
            value: attr.value,
        })),
        children: Array.from(el.children).map(domToJSON),
        text: el.children.length === 0 ? el.textContent.trim() : null
    };
}
