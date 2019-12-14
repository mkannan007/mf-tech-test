***

> A WebdriverIO plugin to generate cucumber step definitions snippets to paste in your code.

Run a test. It automaticly reports you the snippet output when steps are not specified.
Copy and paste the snippet in your step definitions file. When ready with your step remove the line "return 'pending'" and off you go!

![Spec Reporter](https://github.com/johanvaniperen/images/blob/master/snippet-example.png?raw=true")

## Installation

The easiest way is to keep `wdio-cucumber-snippet-reporter` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumber-snippet-reporter": "~0.0.5"
  }
}
```

You can simple do it by:

```bash
npm i wdio-cucumber-snippet-reporter -D
```

## Configuration

Following code shows the default wdio test runner configuration. Just add `'cucumber-snippet'` as reporter
to the array.

To make it work, the parameter value of: ignoreUndefinedDefinitions in cucumberOpts must be set to true.
```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec', 'cucumber-snippet'],
  // ...
  cucumberOpts: {
    // ...
      ignoreUndefinedDefinitions: true,  
    // ...    
  }
};
```

## Development

All commands can be found in the package.json. The most important are:

Watch changes:

```sh
$ npm run watch
```

Run tests:

```sh
$ npm test

# run test with coverage report:
$ npm run test:cover
```

Build package:

```sh
$ npm run build
```
