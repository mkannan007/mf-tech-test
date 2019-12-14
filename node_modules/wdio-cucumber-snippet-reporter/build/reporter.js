'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Initialize a new `Cucumber Snippet` matrix test reporter.
 *
 * @param {Runner} runner
 * @api public
 */
var CucumberSnippetReporter = function (_events$EventEmitter) {
    _inherits(CucumberSnippetReporter, _events$EventEmitter);

    function CucumberSnippetReporter(baseReporter, config) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, CucumberSnippetReporter);

        var _this = _possibleConstructorReturn(this, (CucumberSnippetReporter.__proto__ || Object.getPrototypeOf(CucumberSnippetReporter)).call(this));

        _this.specs = {};
        _this.baseReporter = baseReporter;

        _this.on('runner:start', function (runner) {
            this.specs[runner.cid] = runner.specs;
        });

        _this.on('runner:end', function (runner) {
            var color = this.baseReporter.color;

            process.stdout.write(color('bright yellow', this.getSuiteResult(runner)));
        });
        return _this;
    }

    _createClass(CucumberSnippetReporter, [{
        key: 'getSuiteResult',
        value: function getSuiteResult(runner) {
            var cid = runner.cid;
            var stats = this.baseReporter.stats;
            var results = stats.runners[cid];
            var specHash = stats.getSpecHash(runner);
            var spec = results.specs[specHash];

            /**
             * don't print anything if no specs where executed
             */
            if (Object.keys(spec.suites).length === 0) {
                return '';
            }

            this.errorCount = 0;
            var output = '';

            output += this.getResultList(spec.suites);
            return output;
        }
    }, {
        key: 'getSnippetPhrase',
        value: function getSnippetPhrase(stepName) {
            var output = '';
            var phrase = void 0;
            var argumentPhrase = '';
            var amountOfQuotes = stepName.match(/"/gi) === null ? 0 : stepName.match(/"/gi).length;

            for (var i = 0; i < amountOfQuotes / 2; i++) {
                if (i !== 0) {
                    argumentPhrase += ', ';
                }
                argumentPhrase += 'arg' + (i + 1);
            }

            phrase = stepName;

            var arraySplit = phrase.split('"');
            // takes out the strings between quotes, and replaces it
            for (var _i = 0; _i < arraySplit.length; _i++) {
                if (Math.abs(_i % 2) === 1) {
                    var searchValue = '"' + arraySplit[_i] + '"';
                    var newValue = '"([^"]*)"';
                    phrase = phrase.replace(searchValue, newValue);
                }
            }

            output += 'Given(/^' + phrase + '$/, (' + argumentPhrase + ') => {\n';
            output += '    // Write code here that turns the phrase above into concrete actions\n';
            output += '    return \'pending\';\n';
            output += '});\n';

            return output;
        }
    }, {
        key: 'getResultList',
        value: function getResultList(suites) {
            var output = '';

            var featureTitle = '';
            var featureTitleUndefinedStep = null;
            var snippetArray = [];
            // let scenarioTitle = ''
            var featureObject = {};
            for (var specUid in suites) {
                var spec = suites[specUid];
                var specTitle = suites[specUid].title;

                // check if spec.tests has tests if not, it is a feature description
                var specTitleIsFeature = Object.keys(spec.tests).length === 0 && spec.tests.constructor === Object;

                // feaature title
                if (specTitleIsFeature) {
                    featureTitle = specTitle;
                    // scenarioTitle = ''
                    featureObject.name = featureTitle;
                    featureObject.scenarios = [];
                    // sceanriotitle
                } else {
                    // scenarioTitle = specTitle

                    // log if there are unspecified steps
                    for (var testUid in spec.tests) {
                        var test = spec.tests[testUid];
                        var testTitle = spec.tests[testUid].title;
                        var stepName = testTitle.split(' (undefined step)')[0];

                        if (test.state === 'pending' && testTitle.indexOf('(undefined step)') > -1) {
                            // check for new feature?
                            if (featureTitleUndefinedStep !== featureTitle) {
                                output += ' \n';
                                output += ' \n';
                                output += '*************************************************************************\n';
                                output += '** For Feature: ' + featureTitle + '\n';
                                output += '** Step Definitions are not specified\n';
                                output += '** Copy and Paste the following snippet(s) into your step definitions\n';
                                featureTitleUndefinedStep = featureTitle;
                            }
                            var snippet = '\n' + this.getSnippetPhrase(stepName);
                            var phraseExists = false;
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = snippetArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var existingPhrase = _step.value;

                                    if (snippet === existingPhrase) {
                                        phraseExists = true;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }

                            if (!phraseExists) {
                                output += snippet;
                                snippetArray.push(snippet);
                            }
                        }
                    }
                }
            }
            return output;
        }
    }]);

    return CucumberSnippetReporter;
}(_events2.default.EventEmitter);

exports.default = CucumberSnippetReporter;
module.exports = exports['default'];