/**
 * Created by swapnil on 24/03/18.
 */
(function () {
	'use strict';
	
	var app = angular.module('snakeLadderGame');
	app.controller('homeController', homeController);
	
	homeController.$inject = ['$scope'];
	
	function homeController($scope) {
		$scope.move = [];
		$scope.users = [{
			user: 1,
			cellID: 1
		}];
		
		$scope.currentUser = $scope.users[0];
		
		function movePos(user, cellID) {
			// default
			$( document ).ready(function() {
				if(!user && !cellID) {
					$("#user").appendTo($("#cell1"))
				} else {
					$('#user'+user).appendTo($('#cell'+cellID));
				}
			});
		}
		
		$scope.users.forEach(function (item) {
			movePos(item.user, item.cellID);
		});
		
		function moveUser(user) {
			var currentCell;
			$scope.board.forEach(function (item) {
				item.forEach(function (i) {
					if(i.val === user.cellID) {
						currentCell = i;
					}
				})
			});
			console.log(currentCell)
			var temp = currentCell.snake || 0  + currentCell.ladder || 0;
			if(temp !== 0) {
				user.cellID  = temp;
			}
			if(user.cellID === 100) {
				alert("You have WON!");
				window.location.reload()
			} else {
				movePos(user.user,user.cellID);
			}
			$scope.move.push(currentCell);
		}
		
		$scope.diceVal = null;
		$scope.rollDice = function () {
			$scope.diceVal = Math.floor(Math.random() * 6) + 1;
			
			var temp = $scope.currentUser.cellID + $scope.diceVal;
			if(temp <= 100) {
				$scope.currentUser.cellID = temp;
			}
			moveUser($scope.currentUser);
		};
		
		$scope.board = [];
		var temp = [];
		var rev = false;
		$scope.noOfPayers = 1; // default
		for (var i = 100 ;i>=1;i--){
			temp.push({val:i, ladder: null, snake: null});
			if(temp.length % 10 === 0) {
				if(rev) {
					$scope.board.push(temp.reverse());
					rev = false;
				} else {
					$scope.board.push(temp);
					rev = true
				}
				temp = [];
			}
		}
		
		$scope.board.forEach(function (itemP) {
			itemP.filter(function (item) {
				if ( item.val % 23 === 0  && !item.snake  && !item.ladder) {
					item.ladder = item.val + 15;
					if(item.ladder>=100) {
						item.ladder = 98
					}
				}
				
				if ((item.val % 17 === 0 || item.val % 13 === 0) && !item.ladder && !item.snake ) {
					item.snake = item.val - 15;
					if(item.snake < 0) {
						item.snake = 1;
					}
				}
			})
			
		})
		
		
	}
})();
