// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('PleaseRespond', [
  'ngRoute',
  'mobile-angular-ui',
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/ask',           {templateUrl: 'ask.html', controller: 'Ask', reloadOnSearch: false});
  $routeProvider.when('/view',          {templateUrl: 'view.html', controller: 'View', reloadOnSearch: false}); 
  $routeProvider.when('/view/:param',   {templateUrl: 'viewItem.html', controller: 'ViewItem', reloadOnSearch: false });
  $routeProvider.when('/signup',        {templateUrl: 'signup.html', controller: 'Signup', reloadOnSearch: false});
  $routeProvider.when('/login',         {templateUrl: 'login.html', reloadOnSearch: false}); 
  $routeProvider.otherwise({ redirectTo: '/' });
});

app.factory('Votes', function($http){
  var upvote = function(commentid) {
    return $http({
      method: 'POST',
      url: '/api/vote',
      data: {id: commentid, up: true}
    });
  };

  var downvote = function(commentid) {
    return $http({
      method: 'POST',
      url: '/api/vote',
      data: {id: commentid}
    });
  };

  return {
    upvote: upvote,
    downvote: downvote
  };
});
app.factory('Comments', function($http){
  var addComment = function(comment){
    return $http({
      method: 'POST',
      url: '/api/comment',
      data: comment
    }).then(function(resp){
      return resp.data;
    });
  };

  var getAll = function(postid){
    return $http({
      method: 'GET',
      url: '/api/comment?id=' + postid
    }).then(function (resp){
      return resp.data;
    });
  };
  return {
    addComment: addComment,
    getAll: getAll
  };
});
app.factory('Links', function ($http) {

  var addLink = function(link) {

    return $http({
      method: 'POST',
      url: '/api/ask',
      data: link
    });

  };

  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/ask'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var get = function(id) {
    return $http({
      method: 'GET',
      url: '/api/ask?id='+id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    addLink: addLink,
    getAll: getAll,
    get: get
  };
});


app.controller('Ask', function($rootScope, $scope, $location, Links){
  

  $scope.ask = function() {
    var data = {
      'title' : $scope.title,
      'desc' : $scope.desc
    };

    Links.addLink(data).then(function (response) {
      $location.path('/view');

    });
    
  };
});

app.controller('View', function($rootScope, $scope, $location, Links){
  // 
  // 'Scroll' screen
  // 
  var viewItems = [];

  Links.getAll().then(function(response){
    // console.log(response);
    $scope.viewItems = response;
  });


  $scope.viewItems = viewItems;

  $scope.bottomReached = function() {
    /* global alert: false; */
    // alert('Congrats you viewed to the end of the list!');
  };
});

app.controller('ViewItem', function($rootScope, $scope, $routeParams, $location, Links, Comments, Votes){
  $scope.count = 1;
  $scope.param = $routeParams.param;


  $scope.comments = [];

  Comments.getAll($scope.param).then(function(response){
    $scope.comments = response;
  });

  $scope.sendComment = function() {
    var sendName = '';
    if($scope.cusername === ''){
      sendName = 'anonymous';
    }else{
      sendName = $scope.cusername;
    }
    var newComment = {
      id: $scope.param,
      username: $scope.cusername,
      text: $scope.ctext,
      vote: 0
    };
    Comments.addComment(newComment).then(function (response) {
      newComment.id = response.id;
    });

    $scope.comments.push(newComment);

    $scope.ctext = '';

  };
  $scope.up = function(commentid){
    $scope.comments.forEach(function(item, index){
      if(item.id === commentid){
        $scope.comments[index].vote++;
      }
    });
    Votes.upvote(commentid);
  };

  $scope.down = function(commentid){
    $scope.comments.forEach(function(item, index){
      if(item.id === commentid){
        $scope.comments[index].vote--;
      }
    });
    Votes.downvote(commentid);

  };

  Links.get($scope.param).then(function(response){
    $scope.response = response;
    if(response.id === 1){
      $scope.url = '/img/img1.png';
    }else {
      $scope.url = '/img/img2.png';
    }
  });
});

app.directive('validFile',function(){
  return {
    require:'ngModel',
    link:function(scope, el, attrs, ngModel){
      //change event is fired when file is selected
      el.bind('change', function(){
        scope.$apply(function(){
          ngModel.$setViewValue(el.val());
          ngModel.$render();
        });
      });
    }
  };
});


app.controller('MainController', function($rootScope, $scope){

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });


  //
  // 'Forms' screen
  //  
  $scope.rememberMe = true;
  
  $scope.login = function() {
    alert('You submitted the login form');
  };

  // 
  // 'Drag' screen
  // 
  $scope.notices = [];
  
  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };
});