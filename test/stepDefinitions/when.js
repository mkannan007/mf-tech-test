import { Given, When, Then } from "cucumber";
import homePage from "../pageObjects/home.page.js";
import searchResultsPage from "../pageObjects/searchResults.page.js";
import firstSearchResultPage from "../pageObjects/firstSearchResult.page.js";

When(/^I enter the text "(.*)" in the github search field$/, function(value) {
  homePage.setSearchGitHub(value);
});

When(/^I click on suggestion search button$/, function() {
  homePage.fireSearchButton();
});

When(/^I open the first result item$/, function() {
  searchResultsPage.openFirstSearchResultItem();
});

When(/^I open the README file$/, function() {
  firstSearchResultPage.openReadmeMd();
});
