/**
 * Created by Shivali on 6/30/15.
 */

angular.module('InstantiationRequests')
    .controller('InstantiationRequestsCtrl', ["$scope", "$rootScope", "InstantiationRequestsServices","ENV", function ($scope, $rootScope,InstantiationRequestsServices,ENV) {

        $scope.currentInstantiationRequests= {};

        // retrieve InstantiationRequests to server
        $scope.retrieveInstantiationRequests = (function(){
            InstantiationRequestsServices.retrieveInstantiationRequests(ENV)
                .then(function(result){
                    $rootScope.InstantiationRequests = result;
                    },function(error){
                        alert(error);
                    })
            });

		$scope.retrieveInstantiationRequests();
			
        $scope.openUpdateInstantiationRequests=function(data){
            $scope.currentInstantiationRequests=angular.copy(data);
			$('#updateInstantiationRequests.modal').modal('show');
			$($(".key.ng-binding.ng-scope")[0]).text("InstantiationRequest#"+$scope.currentInstantiationRequests.requestId);
        }

        //update data to server
        $scope.updateInstantiationRequests = function(){
            InstantiationRequestsServices.updateInstantiationRequests($scope.currentInstantiationRequests)
            .then(function(result){
                for(var key in $rootScope.InstantiationRequests){
                    if(result.id==$rootScope.InstantiationRequests[key].id)
                        $rootScope.InstantiationRequests[key] = result;
                }
                },function(error){
                    alert(error);
                })
        }

        $scope.emptyInstantiationRequests = function(){
            $scope.currentInstantiationRequests={};
        }
    }]);