import BasePage from "./base.page.js";

class SearchResultsPage extends BasePage {
  /**
   * define elements
   */

  get searchResults() {
    return $$("[class='v-align-middle']");
  }

  get firstSearchResultItem() {
    return $("[class='v-align-middle']");
  }

  /**
   * your page specific methods
   */

  searchResultsCount() {
    this.firstSearchResultItem.waitForDisplayed();
    return this.searchResults.length;
  }

  openFirstSearchResultItem() {
    this.firstSearchResultItem.waitForEnabled();
    this.firstSearchResultItem.click();
  }
}

export default new SearchResultsPage();
