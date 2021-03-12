# tech-test

# steps to run the test
  Clone the repository to your local machine

# Pre-requisites
  Install Java
  Install Latest Stable version of Node.js (NPM will be defaulted)
  Install latest version of chrome browser

# Check the installation by entering the following commands in cmd prompt
  node -v
  npm -v
  java -version

# Install IDE
  Latest version of Microsoft Visual Studio Code will be better or any other best java script editor

# To Run Test
  Open the downloaded repository in the IDE
  Open Terminal and run the following command
  npm install (to install all the dependent packages listed under package.json)
  npm test/npm run test (to run the automated scripts from feature files)

# Framework
  Framework : Webdriverio (cucumber)
  Version : v5
  Pattern : Page Object Modal
  
# Folder Structure
# Config Folder 
  (base.config.js --> passing values browser, url, timeouts for conf.js file, 
  contents.config.js --> maintaining copyText, 
  Local.conf.js --> Test Runner Configuration)
# features folder (maintaining .feature file)
# pageObjects 
  (maintaining page wise objects and page specific methods, 
    base.page.js act as Parent class and remaining *.page.js act as child methods (OOPS Inheritence concept)
    webdriverio v5 specific wait commands is used for sync for all locators and will throw the default locator based errors after timeout)
# reports folder (generate multi cucumber html report)
# stepDefinitions (Implementation of feature file scenario steps)
    given.js file for pre-requisite steps
    when.js file for action related steps
    then.js file for assersion related steps
    For assertion (used chai 'should' as it is a bdd-cucumber framework)

# Note: The above project is tested with Windows 10 Platform with Chrome browser version 78, @MAC browser.maximizeWindow(); might not work in that case use browser.setWindowSize(width, height)
