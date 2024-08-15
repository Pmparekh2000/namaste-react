import { sum } from "../sum";

test("Testing sum function to work correctly", () => {
    const sumValue = sum(1, 2);
    expect(sumValue).toBe(3);
});
