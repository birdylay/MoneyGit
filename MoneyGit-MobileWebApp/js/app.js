
var sl_app = 'eyJpdiI6InRzcytSV1NGZUJqcWxhMjJrdUFQS0E9PSIsInZhbHVlIjoiVnlCUnIzSk5XeStZOExjaVwvRUM5RDBkMDJFYndHbUxHdHZnekU0eW9pZTQ9IiwibWFjIjoiYWFkNmIzMDUxZjdmNTQ1NTMzMzU3Nzk3NTlkNWQzMWUxZGM2ODQ2ZTIwZjE4ZTc2YjE4NmVjZTE0Yjg2YjFlYiJ9';
var locale = 'en';
var url = 'http://rhyno.buildmobi.net';

var ngApp = angular.module('ngApp', ['ionic', 'ngResource', 'ngApp.controllers', 'ngApp.services'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $ionicModal, $ionicPopup, $templateCache, $http, $state) {
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            noBackdrop: false
        });
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });

	$ionicPlatform.ready(function() {
		/* Ready */
	});

	/* Global login & registration */
	$rootScope.systemModal = function (tpl) {

		$ionicModal.fromTemplateUrl(url + '/system.html?tpl=' + tpl + '&sl=' + sl_app, {
			id: tpl,
			scope: $rootScope,
      		backdropClickToClose: false,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$rootScope.closeSysModal();

			$rootScope.sysModal = modal;
			$rootScope.sysModal.show();
		});
	};

	$rootScope.closeSysModal = function() {
		if (typeof $rootScope.sysModal !== 'undefined')  $rootScope.sysModal.hide();
	};

	$rootScope.$on('modal.hidden', function(event, modal) {
		if (modal.id == 'login') $templateCache.remove(url + '/system.html?tpl=login&sl=' + sl_app);
		if (modal.id == 'register') $templateCache.remove(url + '/system.html?tpl=register&sl=' + sl_app);
		if (modal.id == 'reset') $templateCache.remove(url + '/system.html?tpl=reset&sl=' + sl_app);
	});

	/* Registration */
	$rootScope.systemRegister = function (user) {
		$ionicLoading.show();
		var mail = (typeof user === 'undefined' || typeof user.mail === 'undefined') ? '' : user.mail;
		var pass = (typeof user === 'undefined' || typeof user.pass === 'undefined') ? '' : user.pass;

		$http({
			url: url + '/api/v1/account/public-user-register', 
			method: "POST",
			data: {mail: mail, pass: pass, sl: sl_app}
		}).success(function(response){

			$ionicPopup.alert({
				title: response.title,
				content: response.content
			}).then(function(res) {
				if (response.result == 'success')
				{
					$rootScope.sysModal.hide();
					$rootScope.sysAccountCallback();
				}
			});
			
		}).error(function(){
			alert(response.responseText);
		}).finally(function(){
			$ionicLoading.hide();
		});
	};

	/* Login */
	$rootScope.systemLogin = function (user) {
		$ionicLoading.show();
		var mail = (typeof user === 'undefined' || typeof user.mail === 'undefined') ? '' : user.mail;
		var pass = (typeof user === 'undefined' || typeof user.pass === 'undefined') ? '' : user.pass;

		$http({
			url: url + '/api/v1/account/public-user-login', 
			method: "POST",
			data: {mail: mail, pass: pass, sl: sl_app}
		}).success(function(response){

			if (typeof response.title !== 'undefined')
			{
				$ionicPopup.alert({
					title: response.title,
					content: response.content
				}).then(function(res) {
					if (response.result == 'success')
					{
						$rootScope.sysModal.hide();
					}
				});
			}
			else
			{
				$rootScope.sysModal.hide();
				$rootScope.sysAccountCallback();
			}
			
		}).error(function(){
			alert(response.responseText);
		}).finally(function(){
			$ionicLoading.hide();
		});
	};

	/* Reset */
	$rootScope.systemReset = function (user) {
		$ionicLoading.show();
		var mail = (typeof user === 'undefined' || typeof user.mail === 'undefined') ? '' : user.mail;

		$http({
			url: url + '/api/v1/account/public-user-reset', 
			method: "POST",
			data: {mail: mail, sl: sl_app}
		}).success(function(response){

			$ionicPopup.alert({
				title: response.title,
				content: response.content
			}).then(function(res) {
				if (response.result == 'success')
				{
					$rootScope.sysModal.hide();
				}
			});
			
		}).error(function(){
			alert(response.responseText);
		}).finally(function(){
			$ionicLoading.hide();
		});
	};

	/* Logout */
	$rootScope.systemLogout = function () {
		$ionicLoading.show();

		$http({
			url: url + '/api/v1/account/public-user-logout', 
			method: "POST",
			data: {sl: sl_app}
		}).success(function(response){
			$rootScope.sysModal.hide();
			$rootScope.sysAccountCallback();
		}).error(function(){
			alert(response.responseText);
		}).finally(function(){
			$ionicLoading.hide();
		});
	};

	/* General callback */
	$rootScope.sysAccountCallback = function () {
		$state.go($state.$current, {}, { reload: true });
	};

})

.config(function($stateProvider, $locationProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

 $locationProvider.hashPrefix('!'); /*.html5Mode(true)*/ $ionicConfigProvider.backButton.previousTitleText(false).text(''); $httpProvider.interceptors.push(function($rootScope) { return { /* http request show loading */ request: function(config) { $rootScope.$broadcast('loading:show'); return config }, /* Hide loading in case any occurred */ requestError: function(response) { $rootScope.$broadcast('loading:hide'); return response }, /* Hide loading once got response */ response: function(response) { $rootScope.$broadcast('loading:hide'); return response }, /* Hide loading if got any response error */ responseError: function(response) { $rootScope.$broadcast('loading:hide'); return response } } }); $stateProvider .state('nav', { url: '/nav', abstract: true, templateUrl: 'nav.html', controller: 'NavCtrl' }) .state('nav.widget1', { url: '/widget/:widget/:func/:sl/:id', cache: false, views: { 'mainContent': { templateUrl: function(params) { return url + '/api/v1/widget/route/' + params.widget + '/' + params.func + '/' + params.sl + '/' + params.id; } } } }) .state('nav.widget2', { url: '/widget/:widget/:func/:sl/:id/:extra', cache: false, views: { 'mainContent': { templateUrl: function(params) { return url + '/api/v1/widget/route/' + params.widget + '/' + params.func + '/' + params.sl + '/' + params.id + '/' + params.extra; } } } }) .state('nav.moneygit', { url: '/moneygit', class: 'cMoneygit', cache: false, views: { 'mainContent': { templateUrl: 'templates/moneygit.html', controller: 'cMoneygitCtrl' } } }) .state('nav.plan', { url: '/plan', class: 'cPlan', cache: false, views: { 'mainContent': { templateUrl: 'templates/plan.html', controller: 'cPlanCtrl' } } }) .state('nav.about-us', { url: '/about-us', class: 'cAboutUs', cache: false, views: { 'mainContent': { templateUrl: 'templates/about-us.html', controller: 'cAboutUsCtrl' } } }) .state('nav.account', { url: '/account', class: 'cAccount', cache: false, views: { 'mainContent': { templateUrl: 'templates/account.html', controller: 'cAccountCtrl' } } }) .state('nav.profile', { url: '/profile', class: 'cProfile', cache: false, views: { 'mainContent': { templateUrl: 'templates/profile.html', controller: 'cProfileCtrl' } } }) .state('nav.fixed-expenses', { url: '/fixed-expenses', class: 'cFixedExpenses', cache: false, views: { 'mainContent': { templateUrl: 'templates/fixed-expenses.html', controller: 'cFixedExpensesCtrl' } } }) .state('nav.variable-costs', { url: '/variable-costs', class: 'cVariableCosts', cache: false, views: { 'mainContent': { templateUrl: 'templates/variable-costs.html', controller: 'cVariableCostsCtrl' } } }) .state('nav.income', { url: '/income', class: 'cIncome', cache: false, views: { 'mainContent': { templateUrl: 'templates/income.html', controller: 'cIncomeCtrl' } } }) .state('nav.assests', { url: '/assests', class: 'cAssests', cache: false, views: { 'mainContent': { templateUrl: 'templates/assests.html', controller: 'cAssestsCtrl' } } }) .state('nav.goals', { url: '/goals', class: 'cGoals', cache: false, views: { 'mainContent': { templateUrl: 'templates/goals.html', controller: 'cGoalsCtrl' } } }) .state('nav.2a-user-profile-2a', { url: '/2a-user-profile-2a', class: 'c2aUserProfile2a', cache: false, views: { 'mainContent': { templateUrl: 'templates/2a-user-profile-2a.html', controller: 'c2aUserProfile2aCtrl' } } }) .state('nav.expenses-2a', { url: '/expenses-2a', class: 'cExpenses2a', cache: false, views: { 'mainContent': { templateUrl: 'templates/expenses-2a.html', controller: 'cExpenses2aCtrl' } } }) .state('nav.send-data', { url: '/send-data', class: 'cSendData', cache: false, views: { 'mainContent': { templateUrl: 'templates/send-data.html', controller: 'cSendDataCtrl' } } }) .state('nav.dreams-2', { url: '/dreams-2', class: 'cDreams2', cache: false, views: { 'mainContent': { templateUrl: 'templates/dreams-2.html', controller: 'cDreams2Ctrl' } } }) .state('nav.recommendation', { url: '/recommendation', class: 'cRecommendation', cache: false, views: { 'mainContent': { templateUrl: 'templates/recommendation.html', controller: 'cRecommendationCtrl' } } }) .state('nav.time', { url: '/time', class: 'cTime', cache: false, views: { 'mainContent': { templateUrl: 'templates/time.html', controller: 'cTimeCtrl' } } }) .state('nav.expenses', { url: '/expenses', class: 'cExpenses', cache: false, views: { 'mainContent': { templateUrl: 'templates/expenses.html', controller: 'cExpensesCtrl' } } }) .state('nav.vote-up', { url: '/vote-up', class: 'cVoteUp', cache: false, views: { 'mainContent': { templateUrl: 'templates/vote-up.html', controller: 'cVoteUpCtrl' } } }) .state('nav.rent', { url: '/rent', class: 'cRent', cache: false, views: { 'mainContent': { templateUrl: 'templates/rent.html', controller: 'cRentCtrl' } } }) .state('nav.products', { url: '/products', class: 'cProducts', cache: false, views: { 'mainContent': { templateUrl: 'templates/products.html', controller: 'cProductsCtrl' } } }) .state('nav.coupons', { url: '/coupons', class: 'cCoupons', cache: false, views: { 'mainContent': { templateUrl: 'templates/coupons.html', controller: 'cCouponsCtrl' } } }) .state('nav.top-get-rich', { url: '/top-get-rich', class: 'cTopGetRich', cache: false, views: { 'mainContent': { templateUrl: 'templates/top-get-rich.html', controller: 'cTopGetRichCtrl' } } }) .state('nav.ibm-wattson', { url: '/ibm-wattson', class: 'cIbmWattson', cache: false, views: { 'mainContent': { templateUrl: 'templates/ibm-wattson.html', controller: 'cIbmWattsonCtrl' } } }) .state('nav.crowd-fundraising', { url: '/crowd-fundraising', class: 'cCrowdFundraising', cache: false, views: { 'mainContent': { templateUrl: 'templates/crowd-fundraising.html', controller: 'cCrowdFundraisingCtrl' } } }); $urlRouterProvider.otherwise('/nav/moneygit');

});

