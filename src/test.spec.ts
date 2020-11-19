import { expect } from 'chai';

describe("A suite is just a function", () => {
  it("Should make sure that truth is always true", () => {
    expect(true).to.be.equal(true);
  });

  it("Should handle TS enums", () => {
    enum Test {
      foo
    }

    expect(Test.foo).to.be.equal(0);
  });
});
