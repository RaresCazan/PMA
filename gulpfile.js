var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del =  require('del');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});
//**********************************************************************************
//* Process less to css - clean, regenerate and watcher over changes
//**********************************************************************************
gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Less ---> css');
    log('curent file location:'+config.less);
    log('curent file location:'+config.temp);
    return gulp
        .src(config.less) //files location
        .pipe($.plumber()) //handle errors
        .pipe($.less()) //process with less les to css
        .pipe($.autoprefixer({browsers: ['last 2 version','> 5%']}))//prefixer
        .pipe(gulp.dest(config.temp))
});

gulp.task('clean-styles', function(){
    var files =  config.temp + '**/*css';
    clean(files);
})

gulp.task('less-watcher', function(){
    gulp.watch([config.less],['styles']);
})
//*********************************************************************************

//**********************************************************************************
//* Html Inject - updates the page scripts  
//* npm install --save -dev wiredep gulp-inject
//**********************************************************************************
gulp.task('wiredap', function(){
     log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep =  require('wiredep').stream;
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
        
})


//**
//*clean files from a location
//**
function clean(path)
{
    log('Cleaning:'+ $.util.colors.blue(path));
    del(path);
}

////////////

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
