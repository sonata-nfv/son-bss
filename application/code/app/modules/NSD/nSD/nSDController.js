/**
 * Created by Shivali on 6/30/15.
 */

angular.module('NSD')
    .controller('NSDCtrl', ["$scope", "$rootScope", "NSDServices","ENV",function ($scope, $rootScope,NSDServices,ENV) {

        $scope.currentNSD= {};
        // retrieve NSD to server
        $scope.retrieveNSDs = (function(){
            NSDServices.retrieveNSDs(ENV)
                .then(function(result){
                    $rootScope.nSDs = result;
                    },function(error){
                        alert(error);
                    })
            });

		$scope.retrieveNSDs();
		
        $scope.openAddNSD=function(){
            $scope.currentNSD= {};
            $('#addNSD.modal').modal('show');
        }

        // save NSD to server
        $scope.saveNSD = function(){
            NSDServices.saveNSD($scope.currentNSD)
            .then(function(result){
                    $rootScope.nSDs.push(result);
                },function(error){
                    alert(error);
                })
        }

        $scope.openUpdateNSD=function(data){
	    $scope.currentNSD=angular.copy(data);
        $('#updateNSD.modal').modal('show');	    
	    $($(".key.ng-binding.ng-scope")[0]).text("NSD#"+$scope.currentNSD.uuid);
	    
	    //$(".key.ng-binding.ng-scope").text("NSD")
        }

        $scope.openInstantiateNSD=function(data){
            $scope.currentNSD=angular.copy(data);
            $('#instantiateNSD.modal').modal('show');
        }

        
        $scope.instantiateNSD = function(){
				//console.log("$scope.currentNSD.uuid: "+$scope.currentNSD.uuid);
                NSDServices.instantiateNSD($scope.currentNSD.uuid,ENV)
                .then(function(result){
                    $('#instantiateNSD.modal').modal('hide');
                },function(error){
                    alert(error);
                })
        }

        $scope.emptyNSD = function(){
            $scope.currentNSD={};
	};    
	$scope.showPopover = function(nSD){
	$scope.popoverIsVisible = true; 
	$scope.hoveredNSD = nSD; 
	};

        $scope.hidePopover = function(){
	$scope.popoverIsVisible = false;
	};
    
    }]);