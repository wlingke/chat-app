APP.controller('appController', function($scope, Auth){
    $scope.logout = Auth.$unauth()
})