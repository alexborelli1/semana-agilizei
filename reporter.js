const reporter = require('cucumber-html-reporter')

const options = {
    theme: 'bootstrap',
    jsonDir: 'cypress/reports/cucumber-json',
    output: 'cypress/reports/index.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "Versao": "Demo Automation ",
        "Ambiente Teste": "192.168.50.52",
        "Navegador": "Chrome  120.0.6099.110",
        "Plataforma": "Windows 2022",
        "Executado": "Local"
    },
};

reporter.generate(options)