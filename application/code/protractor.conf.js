var HtmlScreenshotReporter = require('protractor-jasmine2-html-reporter');

var reporter = new HtmlScreenshotReporter({
  //dest: 'E2E_tests/reports',
  //filename: 'my-report.html'
  savePath: 'E2E_tests/reports/'
});

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['E2E_tests/todo-spec.js'],
  
  capabilities: {
  'browserName': 'phantomjs',
    version: '',
    platform: 'ANY',
	'phantomjs.binary.path': './node_modules/phantomjs/lib/phantom/bin/phantomjs.exe',
	'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },
     
  
  onPrepare: function() {
      jasmine.getEnv().addReporter(reporter);
   }
}