module.exports = function() {
    var client = './public/';
    //var clientApp = client +'app/';
    var clientApp = client;
    var config = {
        temp: './temp/', //folder temp in the root
        // all js to vet
        alljs: [
            './public/**/*.js',
            './*.js'
        ],
        client: client,
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!'+ clientApp + '**/*.spec.js',
        ],
        
        less : client + 'styles/styles.less'
        /**
        * Bower and NPM locations
        */
        bower:{
            json: require('./bower.json'),
            directory:'./bower_components',
            ignorePath: '../..'
        }
    };
    
    config.getWiredepDefaultOptions =  function(){
        var options ={
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        }
    }
    return config;
};
