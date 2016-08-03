(function(){
    angular.module('app')
        /*.comtroller('AllSchoolsController',['dataService', 'notifier', AllSchoolsController]);*/
    .controller('AllSchoolsController',['dataService', '$log', allSchoolsController]);
    
   /* AllSchoolsController = function(dataService, notifier) {*/
     /*AllSchoolsController = function(dataService) {*/
    function allSchoolsController(dataService, log) {
        var vm = this;
        
        dataService.getAllSchools()
            .then(function(schools){
               /* $log.error(schools);*/
                /*let schools = GetAllData();
                log.log('schools: ' + JSON.stringify(schools));*/
                vm.allSchools = schools;
            })
            .catch(showError);
        
        function showError(msg){
            log.log('MSG: ' + msg);
            //notifier.error(msg);
        }
    }
    
    function GetAllData() {
        return [{
                    "id": 1,
                    "name": "Fort Craig Elementary",
                    "principal": "Michelle Thorne"
                  },
                  {
                    "id": 2,
                    "name": "Edgewood Elementary",
                    "principal": "Audrey Hills"
                  },
                  {
                    "id": 3,
                    "name": "Clarke Elementary",
                    "principal": "Scott Johnson"
                  },
                  {
                    "id": 4,
                    "name": "Meadowview Elementary",
                    "principal": "Jeffrey Bender"
                  },
                  {
                    "id": 5,
                    "name": "Coulter Ridge Elementary",
                    "principal": "Leigh Williams"
                  },
                  {
                    "id": 6,
                    "name": "Hilltop Elementary",
                    "principal": "Daniel Lanier"
                  }];
    }

}())
