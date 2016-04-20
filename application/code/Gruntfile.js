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
			apiEndpoint: 'http://localhost:25001'
		      }
		    }
		  },
		  integration: {
		    options: {
		      dest: 'app/config/config.js'
		    },
		    constants: {
		      ENV: {
			name: 'development',
			apiEndpoint: 'http://localhost:25002'
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
			dist: {
				port: 1337,
				base: 'app'
			}
		}
	});

	grunt.loadNpmTasks('grunt-connect');
	grunt.loadNpmTasks('grunt-ng-constant');
	
	grunt.registerTask('default', 'connect:dist');
	grunt.registerTask('serve', function (target) {

	if (target === 'development') {
    
	return grunt.task.run(['ngconstant:development','connect:dist']);
  }
  
});

};
