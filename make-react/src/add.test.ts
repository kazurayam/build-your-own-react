import { test, expect } from "vitest";
import { add } from "./add";

test('1+1=2', () => {
    expect(add(1,1)).toBe(2)
})

test('-∞ + ∞ makes NaN', () => {
    expect(
        add(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)
    ).toBe(NaN)
});