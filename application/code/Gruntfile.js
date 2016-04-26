var fmock =  function (req, res, next) {		
							console.log("Mock: receiving "+req.method+" request");
							if (req.url.indexOf('/mock') === 0) {
						 
							  // everything after /mock is the path that we need to mock
							  var path = req.url.substring(5);
							  var body = '';
							  if (req.method === 'OPTIONS') {		
							    console.log("OPTIONS");
								
								res.setHeader('Access-Control-Allow-Origin', '*');
								res.setHeader('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept');								  
								res.writeHeader(200, {
									"Content-Type": "application/json"
								});
								res.end(); 
							  } else {
									if (req.method === 'POST') {		
										console.log("POST");
										body += '{ "requestId": "12345" }';
										res.setHeader('Access-Control-Allow-Origin', '*');
										res.setHeader('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept');								  
										res.writeHeader(200, {
											"Content-Type": "application/json"
										});
										res.write(body);
										res.end(); 
								  } else {
									  if (req.method === 'GET') {
										  console.log("GET");
										  if (path.indexOf('/services') === 0) {
											  //body response
											  body += '[';
											  body += '{ "name": "service1", "version": 1, "description": "purpose 1 service", "uuid": "32adeb1e-d981-16ec-dc44-e288e80067a1", "sla": 5, "vendor": "Vendor 1"}';
											  body += ',';
											  body += '{ "name": "service2", "version": 3, "description": "purpose 2 service", "uuid": "32adeb1e-d981-16ec-dc44-e288e80067a2", "sla": 1, "vendor": "Vendor 2"}';
											  body += ']';			
											  //body response
											  res.setHeader('Access-Control-Allow-Origin', '*');
											  res.writeHeader(200, {
												"Content-Type": "application/json"
											  });										  
											  res.writeHead['content-type'] = 'application/json';
											  res.write(body);
											  res.end(); 
										  } else {
											  if (path.indexOf('/requests') === 0) {
												  body += '[';
												  body += '{ "requestId": "12345", "status":"In Progress" ,"descriptorId": "D11111","instanceId": "I11111"}';
												  body += ',';
												  body += '{ "requestId": "12346", "status": "Ready", "descriptorId": "D22222","instanceId": "I22222"}';
												  body += ']';
												  res.setHeader('Access-Control-Allow-Origin', '*');
												  res.writeHeader(200, {
													"Content-Type": "application/json"
												  });											  
												  res.write(body);
												  res.end();
											  } else {
												  res.setHeader('Access-Control-Allow-Origin', '*');											  
												  res.writeHeader(200, {
													"Content-Type": "application/json"
												  });
												  res.write(body);
												  res.end();
											  }
										  }
									  } else {
											console.log("OTHERS...");
											next();
										}  
								}	
							  }
							}
						};


module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {			
			files: ['src/*'],
			tasks: ['jshint']
		},
		ngconstant: {
			// Options for all targets
			options: {
		    space: '  ',
		    wrap: '"use strict";\n\n {%= __ngModule %}',
		    name: 'config',
			livereload: true
		  },
		  // Environment targets
		  development: {
		    options: {
		      dest: 'app/config/config.js'
		    },
		    constants: {
		      ENV: {
			name: 'development',
			apiEndpoint: 'http://localhost:1338/mock'
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
			apiEndpoint: 'http://sp.int.sonata-nfv.eu:32001'
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
			apiEndpoint: 'http://production.server:XXXX'
		      }
		    }
		  }
		},
		connect: {			
			dist: {				
				options: {
					port: 1337,
					base: 'app'
				}
			},
			mock: {								
				options: {
					port: 1338,
					base: 'app',
					middleware: [
						fmock
					],
				},
			},									
			int: {
				options: {
					port: 1337,
					base: 'app'
				}				
			},
			prod: {
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
			  'app/vendor/jquery/dist/jquery.js',
			  'app/vendor/bootstrap/dist/js/bootstrap.js',
			  'app/vendor/api-check/dist/api-check.js',
			  'app/vendor/angular/angular.js',
			  'app/vendor/angular-ui-router/release/angular-ui-router.js',
			  'app/vendor/angular-formly/dist/formly.js',
			  'app/vendor/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
			  'app/vendor/angular-json-tree/build/angular-json-tree.js',
			  'app/vendor/angular-animate/angular-animate.js',
//			  'app/vendor/angular/angular.js',
			  'app/vendor/angular-mocks/angular-mocks.js',
// 			  'app/vendor/**/*.js',

			  //'app/modules/**/*.js',
			  'app/config/*.js',
   			  'app/*.js',
  			  'app/modules/common/*.js',
			  'app/modules/NSD/nSD/*.js',

    			  //'app/modules/**/*.js',
			  
			  'app/test/NSD/nsdTest.js'
			  ]
			}
		  }
		}
	});
    grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ng-constant');	
	
	grunt.registerTask('default', 'connect:dist');
	grunt.registerTask('test', ['karma']);;  
	grunt.registerTask('serve', function (target) {	
	
	if (target === 'development') {    
		return grunt.task.run(['ngconstant:development', 'connect:dist', 'connect:mock', 'watch']);
	}
  	if (target === 'integration') {    
		return grunt.task.run(['ngconstant:integration','connect:int:keepalive']);
	}
  	if (target === 'production') {    
		return grunt.task.run(['ngconstant:production','connect:prod:keepalive']);
	}  
});

}; 
