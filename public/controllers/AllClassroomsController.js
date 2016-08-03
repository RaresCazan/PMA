(function () {
   
    angular.module('app')
        .controller("AllClassroomsController",['dataService', '$log', allClassroomsController]);
    
    function allClassroomsController(dataService, log) {
        var vm = this;
        
        dataService.getAllClassrooms()
            .then(function (allClassrooms) {
                  vm.allClassrooms = allClassrooms;
            }) 
            .catch(showError);
        
        function showError(msg){
            log.log('MSG: ' + msg);
            //notifier.error(msg);
        }    
    }
}())