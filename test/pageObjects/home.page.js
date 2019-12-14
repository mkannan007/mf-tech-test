import BasePage from "./base.page.js";
import config from "../config/base.config.js";

class HomePage extends BasePage {
  /**
   * define elements
   */

  //search github
  get searchGitHub() {
    return $("input[aria-label='Search GitHub']");
  }

  //search button
  get searchButton() {
    return $("#jump-to-suggestion-search-global");
  }

  /**
   * define or overwrite page methods
   */
  open() {
    super.open(config.baseUrl);
    browser.setTimeout({ pageLoad: 5000 });
  }

  /**
   * page specific methods
   */

  getPageTitle() {
    return browser.getTitle();
  }

  setSearchGitHub(value) {
      this.searchGitHub.waitForEnabled();
      this.searchGitHub.setValue(value);
  }

  fireSearchButton() {
    this.searchButton.waitForClickable();
    this.searchButton.click();
  }
}

export default new HomePage();
