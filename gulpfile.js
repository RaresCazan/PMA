var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync =  require('browser-sync');
var config = require('./gulp.config')();
var del =  require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var replace = require('gulp-replace');
var port = process.env.PORT || config.defaultPort;

gulp.task('vet', function () {
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
gulp.task('styles', ['clean-styles'], function () {
    log('Compiling Less ---> css');
    log('curent file location:' + config.less);
    log('curent file location:' + config.temp);
    return gulp
        .src(config.less) //files location
        .pipe($.plumber()) //handle errors
        .pipe($.less()) //process with less les to css
        .pipe($.autoprefixer({browsers: ['last 2 version' , '> 5%']}))//prefixer
        .pipe(gulp.dest(config.temp))
});

gulp.task('clean-styles', function(){
    var files =  config.temp + '**/*css';
    clean(files);
});

gulp.task('less-watcher', function(){
    gulp.watch([config.less],['styles']);
});
//*********************************************************************************

//**********************************************************************************
//* Html Inject - updates the page scripts  
//* npm install --save -dev wiredep gulp-inject
//* npm install --save-dev gulp-uglify    
//* npm install --save-dev gulp-replace
//**********************************************************************************
gulp.task('wiredep', function(){
     log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep =  require('wiredep').stream;
    return gulp
        .src(config.index) //where to add        
        .pipe(wiredep(options)) //secify what to add
        .pipe($.inject(gulp.src(config.js)))
        .pipe(replace('/public/', ''))
        .pipe(gulp.dest(config.client));
        
})

gulp.task('inject', ['wiredep'], function() {
    log('Wire up the app css into the html, and call wiredep ');
    var options = config.getWiredepDefaultOptions();
    var wiredep =  require('wiredep').stream;
    
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

//**********************************************************************************
//* Prepare the dev environment -  
//* npm install --save -dev wiredep gulp-nodemon
//**********************************************************************************
gulp.task('serve-dev', ['inject'], function() {
    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync();
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
});

//**********************************************************************************
//* Server Dev - monitor all the files
//* 
//* npm install browser-sync --save-dev Browser in sync
//**********************************************************************************

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    gulp.watch([config.less], ['styles'])
        .on('change', function(event) { changeEvent(event); });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}


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
