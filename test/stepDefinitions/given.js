import { Given, When, Then } from 'cucumber';
import homePage from "../pageObjects/home.page.js"

  Given(/^I have navigated to github homepage$/, function() {
    homePage.open();
  });
