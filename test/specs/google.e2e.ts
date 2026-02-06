import GooglePage from "../pageobjects/google.page";

describe("Google search", () => {
  it("should search webdriverIO", async () => {
    await GooglePage.open();
    await GooglePage.search("webdriverio");
    await expect(browser).toHaveTitle("WebdriverIO");
  });
});
