(function(){
    
/*    angular.module('app')
        .controller('AllActivitiesController',['dataService', '$log', 'activities', AllActivitiesController]);
    
    function AllActivitiesController(dataService, log)
    {
        var vm = this;
        
        vm.selectedMonth = 1; // default to January
        
        vm.allActivities = activities;
        
        dataService.getAllActivities()
            .then(function () {
                 let activities = GetAllData();
                 vm.allActivities = activities;
                 log.log('activities: ' + JSON.stringify(activities));
            }).catch(showError)
        
    }
    
     function showError(msg){
            log.log('MSG: ' + msg);
            //notifier.error(msg);
        }*/
    
     angular.module('app')
        .controller('AllActivitiesController', ['dataService', '$state', 'activities', '$log', AllActivitiesController]);

    function AllActivitiesController(dataService, $state, activities, $log) {
        
        var vm = this;
        
        vm.selectedMonth = "1"; // default to January
        
        dataService.getAllClassrooms()
            .then(function(allClassrooms) {  
                vm.allClassrooms = allClassrooms;
                vm.selectedClassroom = allClassrooms[0];
            })
            .catch(showError);
        dataService.getAllActivities()
            .then(function() {   
                 vm.allActivities = activities;
            })
            .catch(showError);
        
        vm.search = function () {
            $state.go('classroom_detail', {id: vm.selectedClassroom.id, month: vm.selectedMonth});
        };
        
        function showError(msg) {
           log.log('MSG: ' + msg);
        };
        /*var vm = this;

        vm.selectedMonth = 1; // default to January

        vm.allActivities = activities;

        $log.debug($state.current.data);
        $log.debug($state.current.foo);

        vm.search = function () {
            $state.go('classroom_detail', {id: vm.selectedClassroom.id, month: vm.selectedMonth});
        };


        dataService.getAllClassrooms()
            .then(function() {                
                vm.allClassrooms = GetAllAllClassrooms();
                //vm.selectedClassroom = GetAllAllClassrooms()[0];
            })
            .catch(showError);

        //dataService.getAllActivities()
        //    .then(function(activities) {
        //        vm.allActivities = activities;
        //    })
        //    .catch(showError);

        function showError(message) {
            notifier.error(message);
        }*/

    } 
    
function GetAllActivities() {
        return [
  {
    "activity_id": 1,
    "name": "Museum Field Trip",
    "date": "2015-10-01T16:00:00.000Z",
    "classroom_id": 1,
    "school_id": 1
  },
  {
    "activity_id": 2,
    "name": "Book Fair",
    "date": "2015-10-06T16:00:00.000Z",
    "classroom_id": 2,
    "school_id": 1
  },
  {
    "activity_id": 3,
    "name": "Petting Zoo Visit",
    "date": "2015-10-19T16:00:00.000Z",
    "classroom_id": 3,
    "school_id": 2
  },
  {
    "activity_id": 4,
    "name": "Pottery Class",
    "date": "2015-11-04T16:00:00.000Z",
    "classroom_id": 4,
    "school_id": 2
  },
  {
    "activity_id": 5,
    "name": "Finger Painting Fun",
    "date": "2015-11-16T16:00:00.000Z",
    "classroom_id": 5,
    "school_id": 2
  },
  {
    "activity_id": 6,
    "name": "Visiting Author",
    "date": "2015-11-18T16:00:00.000Z",
    "classroom_id": 6,
    "school_id": 4
  },
  {
    "activity_id": 7,
    "name": "Picnic Lunch",
    "date": "2015-11-23T16:00:00.000Z",
    "classroom_id": 7,
    "school_id": 4
  },
  {
    "activity_id": 8,
    "name": "Lunch with Grandparents",
    "date": "2015-12-01T16:00:00.000Z",
    "classroom_id": 8,
    "school_id": 4
  },
  {
    "activity_id": 9,
    "name": "Visit City Theater",
    "date": "2015-12-09T16:00:00.000Z",
    "classroom_id": 1,
    "school_id": 1
  },
  {
    "activity_id": 10,
    "name": "Create an Art Exhibit",
    "date": "2015-12-11T16:00:00.000Z",
    "classroom_id": 1,
    "school_id": 1
  }
];
    }
    
    function GetAllClassrooms() {
        return [
  {
    "id": 1,
    "name": "Mrs. Cox's 2nd Grade",
    "teacher": "Beth Cox",
    "message": "Always do your best!",
    "school_id": 1
  },
  {
    "id": 2,
    "name": "Mr. Elliott's Kindergarten",
    "teacher": "Martin Elliott",
    "message": "Treat people right!",
    "school_id": 1
  },
  {
    "id": 3,
    "name": "Mrs. Smith's 1st Grade",
    "teacher": "Amanda Smith",
    "message": "Do the right thing!",
    "school_id": 2
  },
  {
    "id": 4,
    "name": "Mr. Johnson's 4th Grade",
    "teacher": "Mike Johnson",
    "message": "Math rocks!",
    "school_id": 2
  },
  {
    "id": 5,
    "name": "Ms. Tanner's Kindergarten",
    "teacher": "Eliza Tanner",
    "message": "Share with new friends!",
    "school_id": 2
  },
  {
    "id": 6,
    "name": "Ms. Baker's 2nd Grade",
    "teacher": "Linda Baker",
    "message": "Reading is fun!",
    "school_id": 4
  },
  {
    "id": 7,
    "name": "Mr. Henderson's 3rd Grade",
    "teacher": "Brian Henderson",
    "message": "It's almost Summer!",
    "school_id": 4
  },
  {
    "id": 8,
    "name": "Mrs. Carey's 3rd Grade",
    "teacher": "Michelle Carey",
    "message": "Let's learn!",
    "school_id": 4
  }
];
    }
}());