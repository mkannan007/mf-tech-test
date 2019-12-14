Feature: Github navigation and validation

    Scenario: Validation of navigating to github webdriverio repository README.md page title
        Given I have navigated to github homepage
            And I should see the page title contains "Home Page Title" content
        When I enter the text "webdriverio" in the github search field
            And I click on suggestion search button
        Then I should see the search results are not empty
            And I open the first result item
            And I open the README file
            And I should see the page title contains "README.md Page Title" content