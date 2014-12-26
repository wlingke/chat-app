APP.factory("Auth", function ($window, $firebaseAuth, FIREBASE_URL) {
    var authRef = new $window.Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(authRef)

    return auth;
});