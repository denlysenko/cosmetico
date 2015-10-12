module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine'],
        basePath: './',
        files: [
        	'assets/bower_components/angular/angular.js',
        	'assets/bower_components/angular-mocks/angular-mocks.js',
        	'assets/modules/app.js',
          'assets/modules/**/*.js',
        	'assets/modules/**/**/*.js' 
        ],
        logLevel:'ERROR',
        autoWatch: false, //watching is handled by grunt-contrib-watch
        singleRun: true
      },
      all_tests: {
      	browsers: ['PhantomJS','Chrome','Firefox']
      }
    }
  });

	grunt.loadNpmTasks('grunt-karma');
};