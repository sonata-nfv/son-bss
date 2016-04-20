module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		ngconstant: {
			// Options for all targets
			options: {
		    space: '  ',
		    wrap: '"use strict";\n\n {%= __ngModule %}',
		    name: 'config',
		  },
		  // Environment targets
		  development: {
		    options: {
		      dest: 'app/config/config.js'
		    },
		    constants: {
		      ENV: {
			name: 'development',
			apiEndpoint: 'http://sp.int.sonata-nfv.eu:32001'
		      }
		    }
		  },
		  integration: {
		    options: {
		      dest: 'app/config/config.js'
		    },
		    constants: {
		      ENV: {
			name: 'integration',
			apiEndpoint: 'http://sp.int.sonata-nfv.eu:42001'
		      }
		    }
		  },
		  production: {
		    options: {
		      dest: 'app/config/config.js'
		    },
		    constants: {
		      ENV: {
			name: 'production',
			apiEndpoint: 'http://prod.server:XXXX'
		      }
		    }
		  }
		},
		connect: {
			production: {
				port: 1337,
				base: 'app'
			},
			integration: {
				port: 1337,
				base: 'app'
			},
			development: {
				port: 1337,
				base: 'app'
			}
		},
		karma: {  
		  unit: {
			options: {
			  frameworks: ['jasmine'],
			  singleRun: true,
			  logLevel: 'DEBUG',
			  browsers: ['PhantomJS'],
			  files: [
			  'app/vendor/angular/angular.js',
			  'app/vendor/angular-mocks/angular-mocks.js',
			  'app/app.js',
			  'app/modules/**/*.js',
				'app/test/NSD/nsdTest.js'				
			  ]
			}
		  }
		}
	});
    grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-connect');
	grunt.loadNpmTasks('grunt-ng-constant');
	
	grunt.registerTask('default', 'connect:dist');
	grunt.registerTask('test', [
  'karma'
]);;
  
	grunt.registerTask('serve', function (target) {

	if (target === 'development') {
    
	return grunt.task.run(['ngconstant:development','connect:development']);
  }
  
  if (target === 'production') {
    
	return grunt.task.run(['ngconstant:production','connect:dist']);
  }
  
  if (target === 'integration') {
    
	return grunt.task.run(['ngconstant:integration','connect:integration']);
  }
  
});

};
