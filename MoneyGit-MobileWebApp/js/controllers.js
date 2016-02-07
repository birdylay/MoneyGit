
angular.module('ngApp.controllers', [])

.controller('MainCtrl', function($scope, $rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
	$scope.$state = $state.current;
    $scope.params = $stateParams;
	$scope.bodyClass = '';
})

.controller('cMoneygitCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cMoneygit'; }).controller('cPlanCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cPlan'; }).controller('cAboutUsCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cAboutUs'; }).controller('cAccountCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cAccount'; }).controller('cProfileCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cProfile'; }).controller('cFixedExpensesCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cFixedExpenses'; }).controller('cVariableCostsCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cVariableCosts'; }).controller('cIncomeCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cIncome'; }).controller('cAssestsCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cAssests'; }).controller('cGoalsCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cGoals'; }).controller('c2aUserProfile2aCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'c2aUserProfile2a'; }).controller('cExpenses2aCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cExpenses2a'; }).controller('cSendDataCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cSendData'; }).controller('cDreams2Ctrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cDreams2'; }).controller('cRecommendationCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cRecommendation'; }).controller('cTimeCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cTime'; }).controller('cExpensesCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cExpenses'; }).controller('cVoteUpCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cVoteUp'; }).controller('cRentCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cRent'; }).controller('cProductsCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cProducts'; }).controller('cCouponsCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cCoupons'; }).controller('cTopGetRichCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cTopGetRich'; }).controller('cIbmWattsonCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cIbmWattson'; }).controller('cCrowdFundraisingCtrl', function($scope, $rootScope, $state, $stateParams) { var scope = angular.element('body').scope(); scope.bodyClass = 'cCrowdFundraising'; }).controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	  };
	  $scope.showRightMenu = function () {
		$ionicSideMenuDelegate.toggleRight();
	  };
});

