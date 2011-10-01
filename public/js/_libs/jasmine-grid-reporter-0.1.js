
jasmine.GridReporter = function () { };
jasmine.GridReporter.prototype.reportRunnerStarting = function (runner) {};
jasmine.GridReporter.prototype.reportRunnerResults = function (runner) {
    var results = runner.results();
    
    if ( window.parent.tests ) { 
        window.parent.tests.done = true;
        window.parent.tests.success = (results.failedCount > 0? false: true);
    }
};
jasmine.GridReporter.prototype.reportSuiteResults = function (suite) {};
jasmine.GridReporter.prototype.reportSpecStarting = function (spec) {};
jasmine.GridReporter.prototype.reportSpecResults = function (spec) {};
jasmine.GridReporter.prototype.log = function () {};
