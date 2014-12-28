APP.controller('loginController', function($scope, Auth, $state){
    $scope.data = {
        email: '',
        password: ''
    };

    $scope.login = function(){
        Auth.$authWithPassword($scope.data)
            .then(function(){
                $state.go('profile')
            }, function(e){
                console.log(e)
            })
    }
})