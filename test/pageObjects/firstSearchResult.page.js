import BasePage from "./base.page.js";
import config from "../config/base.config.js";

class FirstSearchResultPage extends BasePage {
  /**
   * define elements
   */

  //repository search results
  get readmeMdfile() {
    return $("[title='README.md']");
  }

  get readMeMDOpenedFile() {
    return $("#blob-path");
  }

  /**
   * page specific methods
   */

  getPageTitle() {
      this.readMeMDOpenedFile.waitForDisplayed();

      expect(this.readMeMDOpenedFile.getText()).to.equal(
        "webdriverio/README.md"
      );
      return browser.getTitle();
  }

  openReadmeMd() {
      this.readmeMdfile.waitForEnabled();
      this.readmeMdfile.click();
  }
}

export default new FirstSearchResultPage();
