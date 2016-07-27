module.exports = function() {
    var client = './public/';
    //var clientApp = client +'app/';
    var clientApp = client;
    var server = './public/js/';
    var temp = './temp/';
    var config = {
        temp: './temp/', //folder temp in the root
        // all js to vet
        alljs: [
            './public/**/*.js',
            './*.js'
        ],
        client: client,
        //css: './app-content/app.css',//temp + 'styles.css',
        css: [
            //clientApp + '**/*.min.js',
            clientApp + '**/*.css',
            '!'+ clientApp + 'libs/**/*.css',
        ],
        index: client + 'index.html',
        js: [
            //clientApp + '**/*.min.js',
            clientApp + '**/*.js',
            '!'+ clientApp + 'libs/**/*.js',
        ],
        
        less : client + 'styles/styles.less',
        /**
        * Bower and NPM locations
        */
        bower:{
            json: require('./bower.json'),
            directory:'./libs',
            ignorePath: '../..'
        },
        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './server.js'
    };
    
    config.getWiredepDefaultOptions =  function(){
        var options ={
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        }
    }
    
   /* config.getCssWiredepDefaultOptions = function(){
        var options ={
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        }
    }*/
    return config;
};
