(function () {
	'use strict';
	
	/**
	 * @ngdoc overview
	 * @name inBoundPartnerSupportApp
	 * @description
	 * # inBoundPartnerSupportApp
	 *
	 * Main module of the application.
	 */
	angular
		.module('snakeLadderGame', [
			'ui.router','ui.bootstrap'
		])
		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.defaults.withCredentials = true;
		}])
		.config(config);
	
	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	function config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				controller: 'homeController',
				templateUrl: 'views/home/home.html'
			});
		$urlRouterProvider.when('/', '/home');
	}
})();
