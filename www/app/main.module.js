var APP = angular.module('StandardIonic', ['ionic', 'firebase'])
    .constant('FIREBASE_URL', 'https://scorching-fire-3170.firebaseio.com')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'app/login/login.html',
                controller: "loginController",
                resolve: {
                    noUser: function (Auth, $q) {
                        return Auth.$requireAuth().then(function(){
                            return $q.reject("ALREADY_LOGGED_IN")
                        }, function(){
                            return
                        });
                    }
                }
            })
            .state('create_account', {
                url: "/create-account",
                templateUrl: "app/login/create-account.html",
                controller: "createAccountController",
                resolve: {
                    noUser: function (Auth, $q) {
                        return Auth.$requireAuth().then(function(){
                            return $q.reject("ALREADY_LOGGED_IN")
                        }, function(){
                            return
                        });
                    }
                }
            })
            .state('profile', {
                url: "/profile",
                templateUrl: "app/profile/profile.html",
                controller: "profileController",
                resolve: {
                    currentUser: function (Auth) {
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('my_chats', {
                url: "/my-chats",
                template: "<ion-view><ion-content>My Chats</ion-content></ion-view>",
                resolve: {
                    currentUser: function (Auth) {
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('create_chat', {
                url: "/create-chat",
                template: "<ion-view><ion-content>Create Chat</ion-content></ion-view>",
                resolve: {
                    currentUser: function (Auth, $q) {
                        return Auth.$requireAuth()
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/my-chats');

    })
    .run(function ($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page

            if (error === "AUTH_REQUIRED") {
                $state.go("login")
            }else if(error === "ALREADY_LOGGED_IN"){
                $state.go("profile")
            }
        });
    });

