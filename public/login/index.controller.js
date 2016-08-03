(function () {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', Controller);

    function Controller($rootScope, $location, AuthenticationService) {
        var vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() { 
            vm.loading = true;
            $rootScope.isloggedIn = false;
            $rootScope.test ="";
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $rootScope.isloggedIn = true;
                    $rootScope.credentials = result.data;
                    
                    $rootScope.test = "hello test";
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
    }

})();