APP.factory("Auth", function ($window, $firebaseAuth) {
    var authRef = new $window.Firebase("https://scorching-fire-3170.firebaseio.com");
    return $firebaseAuth(authRef);
});