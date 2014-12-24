var APP = angular.module('Chat', ['ionic'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('my_chats', {
                url: "/",
                template: "<ion-view><ion-content>My Chats</ion-content></ion-view>"
            })
            .state('create_chat', {
                url: "/create",
                template: "<ion-view><ion-content>Create Chat</ion-content></ion-view>"
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    });

