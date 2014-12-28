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
                templateUrl: "app/chat/my-chats.html",
                controller: "myChatsController",
                resolve: {
                    currentUser: function (Auth) {
                        return Auth.$requireAuth();
                    }
                }
            })
            .state('create_chat', {
                url: "/create-chat",
                templateUrl: "app/chat/create-chat.html",
                controller: "createChatController",
                resolve: {
                    currentUser: function (Auth, $q) {
                        return Auth.$requireAuth()
                    }
                }
            })
            .state('chat', {
                url: "/chat/:chat_id",
                templateUrl: 'app/chat/chat.html',
                controller: 'chatController',
                resolve: {
                    currentUser: function (Auth, $q) {
                        return Auth.$requireAuth()
                    },
                    currentChat: function($stateParams, Chat, $q){
                        var chat = Chat.getChatData($stateParams.chat_id);
                        return chat.$loaded()
                            .then(function(){
                                if(chat.id){
                                    return chat
                                }else{
                                    return $q.reject("CHAT_NOT_FOUND")
                                }
                            })
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
            }else if(error === "CHAT_NOT_FOUND"){
                $state.go('my_chats')
            }
        });
    });

