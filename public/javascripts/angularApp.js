var  app = angular.module('flapperNews', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home',{
        url: '/home',
        templateUrl: '/home.html',
        controller: 'mainController'
    });
    $stateProvider.state('posts',{
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'postController'
    });

    $urlRouterProvider.otherwise('home');
});

app.controller('mainController', function($scope, posts){
    $scope.posts = posts.posts;
    $scope.addPost = function(){
        if(!$scope.postTitle || $scope.postTitle == '') return;
        $scope.posts.push({
            title: $scope.postTitle,
            link: $scope.postLink,
            upvotes: 0,
            comments:[
                {author: 'Joe', body:'very cool', upvotes: 0},
                {author: 'Jack', body:'notvery cool', upvotes: 0}
            ]
        });
        $scope.Title='';
    };

    $scope.incrementUpvotes = function(post){
        post.upvotes += 1;
    };
})

app.controller('postController', function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
        if(!$scope.commentBody || $scope.commentBody == '') return;
        $scope.post.comments.push({
            author: 'user',
            body: $scope.commentBody,
            upvotes: 0
        });
        $scope.body = '';
    }
});

app.factory('posts', function(){
    var $factory = {
        posts: [
            {title: 'bello', upvotes: 13, comments:[
                {author: 'Joe', body:'very cool', upvotes: 0},
                {author: 'Jack', body:'not very cool', upvotes: 0}
            ]},
            {title:'mah', upvotes: 25, comments:[]},
            {title:'non so', upvotes: 8, comments:[]}
        ]
    };
    return $factory;
});