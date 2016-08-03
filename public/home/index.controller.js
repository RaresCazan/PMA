(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller() {
        var vm = this;
        
        vm.HelloMsg ="Hello User";
        
        initController();

        function initController($rootScope) {
            
        }
    }

})();