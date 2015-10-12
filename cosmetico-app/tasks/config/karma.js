module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine'],
        files: ['./assets/modules/**/*-spec.js',
          './assets/bower_components/angular-mocks/angular-mocks.js'
        ],
        logLevel:'ERROR',
        reporters:['mocha'],
        autoWatch: false, //watching is handled by grunt-contrib-watch
        singleRun: true
      },
      browsers: ['PhantomJS','Chrome','Firefox']
    }
  });

	grunt.loadNpmTask('grunt-karma');
};