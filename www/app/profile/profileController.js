APP.controller('profileController', function($scope, currentUser, User){
    $scope.user = User.get(currentUser.uid);
});