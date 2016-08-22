'use strict';

angular.module('confusionApp')
  .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
    $scope.tab = 1;
    $scope.fillText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading...";
    $scope.dishes =  menuFactory.getDishes().query(
      function(response) {
        $scope.dishes = response;
        $scope.showMenu = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      });

    $scope.select = function(setTab) {
      $scope.tab = setTab;
      if(setTab === 2) {
        $scope.fillText = 'appetizer';
      }else if(setTab === 3) {
        $scope.fillText = 'mains';
      }else if(setTab === 4) {
        $scope.fillText = 'dessert';
      }else {
        $scope.fillText = '';
      }
    };
    $scope.isSelected = function(setTab) {
      return (setTab === $scope.tab);
    };
    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };
  }])
  .controller('ContactController', ['$scope', function($scope) {
    $scope.feedback = {
      mychannel: "",
      firstname: "",
      lastname: "",
      agree: false,
      email: ""
    };
    $scope.channels = [{
      value: "tel", label: "Tel."
    }, {
      value: "Email", label: "Email"
    }];
    $scope.invalidChannelSelection = false;
  }])
  .controller('FeedbackController', ['$scope', function($scope) {
    $scope.sendFeedback = function() {
      console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        $scope.feedback.mychannel="";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])
  .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
    $scope.comment = { rating: 5, author: "", date: "", comment: "" };
    $scope.submitComment = function () {
      $scope.comment.date = new Date().toISOString();
      $scope.dish.comments.push($scope.comment);
      menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
      $scope.commentForm.$setPristine();
      $scope.comment = { rating: 5, author: "", date: "", comment: "" };
    };
  }])
  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    $scope.orderArgu = "";
    $scope.showDish = false;
    $scope.message = "Loading...";
    this.orderArgu = this.orderArgu === "" ? "date" : this.orderArgu;
    $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
      .$promise.then(
        function(response) {
          $scope.dish = response;
          $scope.showDish = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });
  }])

  .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
    $scope.showDish = false;
    $scope.message = "Loading...";
    $scope.promotion = menuFactory.getPromotion(0);
    $scope.chef = corporateFactory.getLeader(3);
    $scope.dish = menuFactory.getDishes().get({id: 0})
    .$promise.then(
      function(response) {
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      });
  }])

  .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    $scope.leaders = corporateFactory.getLeaders();
  }])
;
