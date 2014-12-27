APP.controller('appController', function($scope, Auth){
    $scope.logout = function(){
        Auth.$unauth()
    }
});