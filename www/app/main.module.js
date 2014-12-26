var APP = angular.module('StandardIonic', ['ionic', 'firebase'])
    .constant('FIREBASE_URL', 'https://scorching-fire-3170.firebaseio.com')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'app/login/login.html',
                controller: "loginController"
            })
            .state('create_account', {
                url: "/create-account",
                templateUrl: "app/login/create-account.html",
                controller: "createAccountController"
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
console.log(error)
            if (error === "AUTH_REQUIRED") {
                $state.go("login")
            }
        });
    });

