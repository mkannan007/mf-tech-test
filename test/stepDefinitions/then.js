import { Given, When, Then } from "cucumber";
import homePage from "../pageObjects/home.page.js";
import searchResultsPage from "../pageObjects/searchResults.page.js";
import firstSearchResultPage from "../pageObjects/firstSearchResult.page.js";
import contentsConfig from "../config/contents.config.js";

Then(/^I should see the page title contains \"(.*)\" content$/, function(
  value
) {
  switch (value) {
    case "Home Page Title":
      expect(homePage.getPageTitle()).to.equal(contentsConfig.homePageTitle);
      break;
    case "README.md Page Title":
      expect(firstSearchResultPage.getPageTitle()).to.equal(
        contentsConfig.readmePageTitle
      );
      break;
    default:
      console.log("Value mismatched with feature");
      break;
  }
});

Then(/^I should see the search results are not empty$/, function () {
  expect(searchResultsPage.searchResultsCount()).to.not.be.null;
});
