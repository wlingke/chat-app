APP.controller('createAccountController', function($scope, Auth, $state, User){
    $scope.data = {
        email: '',
        password: ''
    };

    $scope.done= function(){
        Auth.$createUser($scope.data.email, $scope.data.password)
            .then(function(data){
                Auth.$authWithPassword($scope.data)
                    .then(function(authData){
                        return User.set(authData.uid, {email: $scope.data.email})
                    })
                    .then(function () {
                        $state.go('profile')
                    })
            }, function(error){
                console.log(error)
            })
    }
})