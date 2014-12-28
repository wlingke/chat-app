APP.controller('createChatController', function($scope, Chat, currentUser, $state){
    $scope.data = {
        name: "",
        target_person: 'simplelogin:3',
        created_by: currentUser.uid
    }

    $scope.done = function(){
        Chat.createChat($scope.data)
            .then(function(chat){
                $state.go('my_chats')
            })
    }
});