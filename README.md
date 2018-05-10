# PoC project for Cloudbreak GUI

## Background
1. [An Overview of JavaScript Testing in 2018](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)
2. [Use React tools for better Angular apps](https://medium.com/@martin_hotell/use-react-tools-for-better-angular-apps-b0f14f3f8114)
3. [UI Test Automation Frameworks Showdown: TestCafé versus Nightwatch.js](http://www.pqatesting.com/our_ideas/blog/u)
4. [End-to-End Testing with TestCafe](http://mherman.org/testcafe-example/#1)
5. [TestCafe: Easier End-to-end Web App Testing with Node.js](https://www.sitepoint.com/testcafe-easier-end-end-web-app-testing-node-js/)

## Main Goal
Create a demo project with TestCafe to cover a cluster creation workflow with Cloudbreak GUI.

## Run tests
Test command in [package.json](package.json):
```    
"test": "node_modules/.bin/testcafe chrome tests/*.ts -r spec,xunit:result.xml -S -s results/screenshots --debug-on-fail",
```
1. Set the needed environment variables for [environment](environment/environment.ts) file
2. ```yarn test```

## Headless non browser-dependent testing 
    
Aside for Chrome, [TestCafe supports a number of browsers](http://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browsers/browser-support.html#officially-supported-browsers) out-of-the-box. Further, if you don’t need to test browser-dependent functionality, then you can use a headless browser.
    
[Testing in Headless Mode](http://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browsers/testing-in-headless-mode.html) I've introduced a new test command in [package.json](package.json):
```    
"test-headless": "node_modules/.bin/testcafe chrome:headless tests/loginTest.ts",
```
1. Set the needed environment variables for [environment](environment/environment.ts) file
2. ```yarn test-headless```

## Possibilities with testcafe/testcafe Docker image
Execute headless Google Chrome and Firefox e2e tests in Docker container with the help of [Official TestCafe Docker image.](https://hub.docker.com/r/testcafe/testcafe/)

### Run tests in this container on desktop
1. Set the needed environment variables for [environment](environment/environment.ts) file
2. ```make run```

### Run tests in this container on CI
[This script](scripts/run-e2e-tests.sh) is optimized for CI execution. So the Docker container starts only with `-i ` operator.

>  * -t  : Allocate a pseudo-tty
>  * -i  : Keep STDIN open even if not attached
>
[Docker run reference](https://docs.docker.com/engine/reference/run/)

## Comparison (brief list from several articles)

|Categories|Protractor|WebDriverIO|Night Watch|TestCafe|
|:---------|:--------:|:---------:|:---------:|:------:|
|Architecture|Protractor is a wrapper around WebdriverJS (selenium-webdriver node module).|WebdriverIO is custom implementation of W3C webdriver JSON wire protocol.|Night Watch is custom implementation of W3C webdriver JSON wire protocol.|TestCafe uses a URL-rewriting proxy instead of WebDriver. This proxy injects the driver script that emulates user actions into the tested page. This way TestCafe can do everything required for the testing: it can emulate user actions, authentication, run its own scripts & etc.|
|Supported browsers|Edge, Chrome, Firefox, Safari, Opera, HtmlUnit|Edge, Chrome, Firefox, Safari, Opera, HtmlUnit, PhantomJs|Edge, Chrome, Firefox, Safari, Opera, HtmlUnit, PhantomJs|Edge, Chrome, Firefox, Safari, Opera (works with any browser that supports HTML5 without any plugins)|
|Angular specific locator strategies|Supported|Partially supported by adding ‘webdriverjs-angular’ node module. Only ‘WaitForAngular’ has been implemented.|Not supported. But still we should be able to automate angular js application as selenium does.|Supported|
|Inbuilt test runner|Available|Available|Available|Available|
|Supported testing frameworks|Jasmine, Mocha, Cucumber|Jasmine, Mocha, Cucumber|Mocha, inbuilt framework|inbuilt framework|
|Reporting|Junit Xml Reporter, Protractor Html screenshot reporter, Jasmine spec reporter|Allure reporting, Jasmine Spec reporter, Junit xml reporter, Cucumber reporting|Junit xml reporter,Mocha reporting|spec,list,minimal,xUnit,JSON|
|Parallel Execution|Supported|Supported|Supported|Only Concurrency (is an optional mode that allows you to invoke multiple instances of the same browser. These instances constitute the pool of browsers against which tests run concurrently, i.e. each test runs in the first free instance.)|
|Cloud Execution (Sauce Labs, BrowserStack, Testing bot)|Supported|Supported|Supported|Supported|
|Mobile Support (Appium)|Partial support (Supports mobile browsers but does not support native apps)|Android, IOS|Android, IOS|Android, IOS (can run on mobile devices by default, without requiring custom configuration)|
|Synchronous execution|Supported|Supported|Supported|Supported|
|Page Object Pattern|Supported|Supported|Supported|Supported|
|Continuous Integration|Supported|Supported|Supported|Supported|
|Retrying flaky tests|Possible|Possible|Possible|Possible (With enabling the quarantine mode for tests that fail. In this mode, a failed test is executed several more times.)|
|TypeScript support|Inbuilt support|Possible when using Codecept.js|Not yet supported|Inbuilt support|
|Additional Features|Angular application support|CSS regression testing using ‘webdrivercss’ npm package.|–|Plug-in Free Testing (after install, immediately functional), nice async/await syntax|
|Licenses|MIT|MIT|MIT|MIT|
|Dependencies|15|21|10|62|

# Structure
![](utils/images/Cloud%20Page%20Objects.png)

## Page Object Pattern
[Page object is a design pattern](https://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern) that can be implemented as a Selenium best practices. The functionality classes (PageObjects) in this design represent a logical relationship between the pages of the application. There are other design patterns that also may be used in testing. Some use a [Page Factory](https://github.com/SeleniumHQ/selenium/wiki/PageFactory) for instantiating their page objects. Discussing all of these is beyond the scope of this introduction. So I've just collected some basic thoughts and principles here for summary: 

> "A page object wraps an HTML page, or fragment, with an application-specific API, allowing you to manipulate page elements without digging around in the HTML." by [Martin Fowler](http://martinfowler.com/bliki/PageObject.html)

> "By introducing the “elements as first class citizens” principle it is now possible to build up large test suites using this pattern. There are no additional packages required to create page objects. It turns out that ```Object.create``` provides all necessary features we need:
>
> * inheritance between page objects
> * lazy loading of elements and
> * encapsulation of methods and actions
>
> The goal behind page objects is to abstract any page information away from the actual tests. Ideally you should store all selectors or specific instructions that are unique for a certain page in a page object, so that you still can run your test after you’ve completely redesigned your page." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

## Rule of Thumb
> "The basic rule of thumb:
>
> 1. It should allow to do anything and see anything that a human can
> 2. It should also provide an interface that's easy to access and modify
> 3. It should hide the underlying widgetry
> 4. It should have accessor methods that take and return your values and commands
>   * check boxes should use booleans
>   * buttons should be represented by action oriented method names
>
> The page object should encapsulate the mechanics required to find and manipulate the data in the gui control itself." by [Martin Fowler](http://martinfowler.com/bliki/PageObject.html)

> "From the structural side it makes sense to separate spec files and page objects and put them into different directories."...
> ..."Note that you can build up way more complex page object structures than this. For example have specific page objects for modals or split up a huge page object into different objects that inherit from the main page object. The pattern gives you really a lot of opportunities to encapsulate page information from your actual tests, which is important to keep your test suites structured and clear in times where the project and number of tests grows." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

