APP.factory("User", function($FirebaseObject, $firebase, $window, FIREBASE_URL) {
    // create a new factory based on $FirebaseObject
    var UserFactory = $FirebaseObject.$extendFactory({

    });
    var userRef = new $window.Firebase(FIREBASE_URL + "/users");
    var userSync = $firebase(userRef);

    var setUser = function(user_id, data){
        return userSync.$set(user_id, data)
            .then(function(newUserRef){
                return $firebase(newUserRef, { objectFactory: UserFactory }).$asObject()
            });
    };

    var getUser = function(user_id){
        var ref = userRef.child(user_id);
        return $firebase(ref, { objectFactory: UserFactory }).$asObject()
    };


    return {
        get: getUser,
        set: setUser
    }
});