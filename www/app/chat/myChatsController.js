APP.controller('myChatsController', function(User, currentUser, $scope, Chat){
    var chats = User.getChats(currentUser.uid);
    $scope.chats = [];
    chats.on('child_added', function(snap){
        $scope.chats.push(Chat.getChatData(snap.key()))
    })
});

