APP.factory("Chat", function($FirebaseObject, $firebase, $window, FIREBASE_URL) {
    // create a new factory based on $FirebaseObject
    //var UserFactory = $FirebaseObject.$extendFactory({
    //
    //    // these methods exist on the prototype, so we can access the data using `this`
    //});

    var chatMsgRef = new $window.Firebase(FIREBASE_URL + "/chat-messages");
    var chatMetaRef = new $window.Firebase(FIREBASE_URL + "/chat-meta");
    var chatMsgSync = $firebase(chatMsgRef);
    var chatMetaSync = $firebase(chatMetaRef);

    var createChat = function(data){
        data = data || {};
        var participants = [data.created_by, data.target_person];
        var participantsSyncs = participants.map(function(participant){
            var userChatsRef = new $window.Firebase(FIREBASE_URL + "/users/" + participant + "/chats");
            return $firebase(userChatsRef);
        });

        var newChatMetaRef = chatMetaRef.push();
        var newChatMetaSync = $firebase(newChatMetaRef);
        return newChatMetaSync.$set({
            name: data.name,
            created_by: data.created_by,
            create_at: $window.Firebase.ServerValue.TIMESTAMP,
            id: newChatMetaRef.key(),
            participants: (function(){
                var obj = {};
                angular.forEach(participants, function(value, key){
                    obj[value] = true;
                });

                return obj;
            })()
        })
            .then(function(ref){
                var id = newChatMetaSync.$ref().key();
                angular.forEach(participantsSyncs, function(sync){
                    sync.$ref().child(id).setWithPriority(true, $window.Firebase.ServerValue.TIMESTAMP)
                });

                return newChatMetaSync.$asObject();
            })
    };

    var getChatData = function(chat_id){
        var ref = chatMetaRef.child(chat_id);
        return $firebase(ref).$asObject()
    };

    var getChatMsgs = function(chat_id){
        var ref = chatMsgRef.child(chat_id);
        return $firebase(ref).$asArray()
    };

    var sendChatMsg = function(chat_id, data){
        data = data || {};
        return chatMsgSync.child(chat_id).$push({
            message: data.message,
            user_id: data.user_id,
            time: new Date()
        })
    };


    return {
        createChat: createChat,
        getChatData: getChatData,
        getMessages: getChatMsgs,
        sendMessage: sendChatMsg
    }
});