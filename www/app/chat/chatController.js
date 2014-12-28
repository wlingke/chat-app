APP.controller("chatController", function($scope, Chat, currentChat, currentUser, $window){
    $scope.chatData = currentChat;

    $scope.currentUser = currentUser;
    $scope.messages = Chat.getMessages($scope.chatData.id);
    $scope.newMessage = '';
    $scope.sendMessage = function(){
        $scope.messages.$add({
            message: $scope.newMessage,
            user_id: currentUser.uid,
            time: $window.Firebase.ServerValue.TIMESTAMP
        })
        $scope.newMessage = '';
    }
});