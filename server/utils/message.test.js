const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");

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

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    const latitude = 1;
    const longitude = 2;
    const from = "Admin";
    const res = generateLocationMessage(from, latitude, longitude);
    expect(res.createdAt).toBeA("number");
    expect(res).toInclude({
      from,
      url: `https://www.google.com/maps?q=${latitude}, ${longitude}`
    });
  });
});
