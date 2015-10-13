module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine'],
        basePath: './',
        files: [
          'assets/bower_components/underscore/underscore.js',
          'assets/bower_components/angular/angular.js',
          'assets/bower_components/angular-mocks/angular-mocks.js',
          'assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'assets/bower_components/angular-ui-utils/ui-utils.js',
          'assets/bower_components/angular-ui-router/release/angular-ui-router.js',
          'assets/bower_components/angular-animate/angular-animate.js',
          'assets/bower_components/restangular/dist/restangular.min.js',
          'assets/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
          'assets/app.js',
          'assets/modules/**/*.js',
          'assets/modules/**/*-spec.js'
        ],
        logLevel:'ERROR',
        autoWatch: false, //watching is handled by grunt-contrib-watch
        singleRun: true,
        reporter: ['mocha']
      },
      all_tests: {
      	browsers: ['Chrome', 'Firefox', 'PhantomJS']
      }
    }
  });

	grunt.loadNpmTasks('grunt-karma');
};