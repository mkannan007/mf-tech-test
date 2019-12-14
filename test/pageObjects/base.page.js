export default class BasePage {
  constructor() {
    this.title = "My Page";
  }

  open(path) {
    browser.url(path);
    browser.maximizeWindow();
  }
}
