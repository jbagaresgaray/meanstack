'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        mongobackup: {
            options: {
                host: 'localhost',
                port: '27017',
                db: 'Sample',
                dump: {
                    out: './dump',
                },
                restore: {
                    path: './dump/Sample',
                    drop: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'app/{,*/}*.js',
                    'config/{,*/}*.js',
                	'public/{,*/}*.js'
                ]
            }
        },
    });

    grunt.registerTask('clean', [
        'jshint:all'
    ]);
};

/** Command
  - grunt mongobackup:dump
  - grunt mongobackup:restore
  - grunt jshint
**/
