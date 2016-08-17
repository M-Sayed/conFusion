'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
      $scope.tab = 1;
      $scope.fillText = '';
      $scope.showDetails = false;
      $scope.dishes = menuFactory.getDishes();

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

    // .controller('DishCommentController', ['$scope', function($scope) {
    //   $scope.mycomment = {rating: 5, comment: 'good plate'};
    // }])

    .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {
      $scope.orderArgu = "";
      $scope.dish = menuFactory.getDish(parseInt($routeParams.id, 10));
      this.orderArgu = this.orderArgu === "" ? "date" : this.orderArgu;
    }])
;
