const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const res = generateMessage("tole", "neki text");
    expect(res.createdAt).toBeA("number");
    expect(res).toInclude({
      from: res.from,
      text: res.text
    });
  });
});
