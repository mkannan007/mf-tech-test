import events from 'events'

/**
 * Initialize a new `Cucumber Snippet` matrix test reporter.
 *
 * @param {Runner} runner
 * @api public
 */
class CucumberSnippetReporter extends events.EventEmitter {
    constructor (baseReporter, config, options = {}) {
        super()

        this.specs = {}
        this.baseReporter = baseReporter

        this.on('runner:start', function (runner) {
            this.specs[runner.cid] = runner.specs
        })

        this.on('runner:end', function (runner) {
            const {color} = this.baseReporter
            process.stdout.write(color('bright yellow', this.getSuiteResult(runner)))
        })
    }

    getSuiteResult (runner) {
        const cid = runner.cid
        const stats = this.baseReporter.stats
        const results = stats.runners[cid]
        const specHash = stats.getSpecHash(runner)
        const spec = results.specs[specHash]

        /**
         * don't print anything if no specs where executed
         */
        if (Object.keys(spec.suites).length === 0) {
            return ''
        }

        this.errorCount = 0
        let output = ''

        output += this.getResultList(spec.suites)
        return output
    }

    getSnippetPhrase (stepName) {
        let output = ''
        let phrase
        let argumentPhrase = ''
        let amountOfQuotes = (stepName.match(/"/gi) === null ? 0 : stepName.match(/"/gi).length)

        for (let i = 0; i < (amountOfQuotes / 2); i++) {
            if (i !== 0) {
                argumentPhrase += ', '
            }
            argumentPhrase += 'arg' + (i + 1)
        }

        phrase = stepName

        let arraySplit = phrase.split('"')
        // takes out the strings between quotes, and replaces it
        for (let i = 0; i < arraySplit.length; i++) {
            if (Math.abs(i % 2) === 1) {
                let searchValue = `"${arraySplit[i]}"`
                let newValue = `"([^"]*)"`
                phrase = phrase.replace(searchValue, newValue)
            }
        }

        output += `Given(/^${phrase}$/, (${argumentPhrase}) => {\n`
        output += `    // Write code here that turns the phrase above into concrete actions\n`
        output += `    return 'pending';\n`
        output += `});\n`

        return output
    }

    getResultList (suites) {
        let output = ''

        let featureTitle = ''
        let featureTitleUndefinedStep = null
        let snippetArray = []
        // let scenarioTitle = ''
        let featureObject = {}
        for (const specUid in suites) {
            const spec = suites[specUid]
            const specTitle = suites[specUid].title

            // check if spec.tests has tests if not, it is a feature description
            const specTitleIsFeature = Object.keys(spec.tests).length === 0 && spec.tests.constructor === Object

            // feaature title
            if (specTitleIsFeature) {
                featureTitle = specTitle
                // scenarioTitle = ''
                featureObject.name = featureTitle
                featureObject.scenarios = []
                // sceanriotitle
            } else {
                // scenarioTitle = specTitle

                // log if there are unspecified steps
                for (const testUid in spec.tests) {
                    const test = spec.tests[testUid]
                    const testTitle = spec.tests[testUid].title
                    const stepName = testTitle.split(' (undefined step)')[0]

                    if (test.state === 'pending' && testTitle.indexOf('(undefined step)') > -1) {
                        // check for new feature?
                        if (featureTitleUndefinedStep !== featureTitle) {
                            output += ' \n'
                            output += ' \n'
                            output += '*************************************************************************\n'
                            output += (`** For Feature: ${featureTitle}\n`)
                            output += (`** Step Definitions are not specified\n`)
                            output += (`** Copy and Paste the following snippet(s) into your step definitions\n`)
                            featureTitleUndefinedStep = featureTitle
                        }
                        const snippet = '\n' + this.getSnippetPhrase(stepName)
                        let phraseExists = false
                        for (const existingPhrase of snippetArray) {
                            if (snippet === existingPhrase) {
                                phraseExists = true
                            }
                        }
                        if (!phraseExists) {
                            output += snippet
                            snippetArray.push(snippet)
                        }
                    }
                }
            }
        }
        return output
    }
}

export default CucumberSnippetReporter
