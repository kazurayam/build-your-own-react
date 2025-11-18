/**
 * @jest-environment jsdom
 */
import { describe, beforeEach, test, expect } from "vitest";
import { updateTitle } from './domUtils';

describe('updateTitle', () => {
    beforeEach(() => {
        // Reset DOM before each test
        document.body.innerHTML = `
            <h1 id="title">Old Title</h1>
        `;
    });

    test('updates the title text', () => {
        const result = updateTitle('New Title');
        expect(result).toBe('New Title');
        expect(document.getElementById('title').textContent).toBe('New Title');
    });

    test('throws error if title element is missing', () => {
        document.body.innerHTML = ''; // Remove the content
        expect(() => updateTitle('Anything')).toThrow('Title element not found');
    });
});