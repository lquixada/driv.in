
jasmine.GridReporter = function () { };
jasmine.GridReporter.prototype.reportRunnerStarting = function (runner) {};
jasmine.GridReporter.prototype.reportRunnerResults = function (runner) {
    var results = runner.results();

    window.parent.done = true;
    window.parent.noErrors = (results.failedCount > 0? false: true);
};
jasmine.GridReporter.prototype.reportSuiteResults = function (suite) {};
jasmine.GridReporter.prototype.reportSpecStarting = function (spec) {};
jasmine.GridReporter.prototype.reportSpecResults = function (spec) {};
jasmine.GridReporter.prototype.log = function () {};
