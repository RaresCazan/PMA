(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('schools', {
                url: '/schools',
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: 'templates/allSchools.html'
            })
            .state('classrooms', {
                url: '/classrooms',
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: 'templates/allClassrooms.html',
                onEnter: function ($log) {
                    $log.debug('Entering the classrooms state.');
                },
                onExit: function ($log) {
                    $log.debug('Exiting the classrooms state.');
                }
            })
          
            /*.state('activities', {
                url:'/activities',
                controller:'AllActivitiesController',
                controllerAs:'activities',
                templateUr:'templates/allActivities.html'
            
            })*/
            .state('activities', {
                    url: '/activities',
                    controller: 'AllActivitiesController',
                    controllerAs: 'activities',
                    templateUrl: 'templates/allActivities.html',
                    resolve: {
                        activities: function (dataService) {
                            return dataService.getAllActivities();
                        }
                    },
                    /*data: {
                        name: 'My Activity',
                        desc: 'Fun!'
                    },
                    foo: {
                        myFoo: 'bar'
                    }*/
                })
        .state('classroom_detail', {
                url: '/classrooms/{id:[0-9]}/detail/{month}',
                templateUrl: '/app/templates/classroomDetail.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                params: {
                    classroomMessage: { value: 'Learning is fun!' }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            });
    }
 
    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();


