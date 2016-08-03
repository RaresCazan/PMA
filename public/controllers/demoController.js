
angular.module('MyApp', [
    'MyApp.controllers'
    'MyApp.directives'
    'MyApp.providers'
    'MyApp.services'
    'MyApp.filters'
]).config([
    function () {
        'use strict';
        /*your code */
    }
]).factory([
    function () {
        'use strict';
        /*your code */
    }
]).run([
    function () {
        'use strict';
        /*your code */
    }
]);
angular.module('MyApp.controllers', []);
angular.module('MyApp.services', []);
angular.module('MyApp.providers', []);
angular.module('MyApp.directives', []);
angular.module('MyApp.filters', []);
angular.module('MyApp.filters')
    .filter('filterName',
        function () {
            'use strict';
            return function () {
                /*your code */
            };
         });
angular.module('MyApp.providers')
    .filter('providerName',[
        function () {
            'use strict';
            return function () {
                /*your code */
            };
         }]);
angular.module('MyApp.services')
    .filter('serviceName',[
        function () {
            'use strict';
            return function () {
                /*your code */
            };
         }]);
iifi