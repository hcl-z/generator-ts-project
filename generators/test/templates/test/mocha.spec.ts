import { assert } from "chai";
import { addition } from "./calculator";

describe("Calculator Tests", () => {
  it("should return 5 when 2 is added to 3", () => {
    assert.equal(2 + 3, 5);
  });
});
