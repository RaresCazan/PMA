(function () {
    angular.module('app')
        /*.factory('dataService',['$http', '$q','$log','$timeout'], dataService);*/
        .factory('dataService', dataService);
   /* dataService = function($http, $q, $log, $timeout)*/
   /* function dataService($http, $q, $log, $timeout)*/
    function dataService($http, $q, $log, $timeout) {
        function getAllSchools() {
            return $http.get('api/schools')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                   /* $log.error('Error retrieving schools: ' + response.statusText);
                    return $q.reject('Error retrieving schools.');*/
                })
        }
        
        function getAllClassrooms() {
            return $http.get('api/classrooms')
                .then(function (response) {              
                     return response.data;
                })
                .catch(function(response) {
                   /* $log.error('Error retrieving schools: ' + response.statusText);
                    return $q.reject('Error retrieving schools.');*/
                })
        }
        
        function getAllActivities () {
            return $http.get('api/activities')
                .then(function (response) {              
                     return  response.data;
                })
                .catch(function(response) {
                   /* $log.error('Error retrieving schools: ' + response.statusText);
                    return $q.reject('Error retrieving schools.');*/
                })
        }
        
        return {
            getAllSchools: getAllSchools,
            getAllClassrooms: getAllClassrooms,
            getAllActivities : getAllActivities 
         };
    }
    
}());