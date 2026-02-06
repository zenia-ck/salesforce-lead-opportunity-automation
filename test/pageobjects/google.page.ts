import Page from "./page";

class GooglePage extends Page {
  get searchBox() {
    return $('textarea[name="q"]');
  }

  async search(text: string) {
    await this.searchBox.setValue(text);
    await browser.keys("Enter");
  }

  open() {
    return super.open("https://www.google.com");
  }
}

export default new GooglePage();
