/**
 * Created by Shivali on 6/30/15.
 */

angular.module('InstantiationRequests')
    .controller('InstantiationRequestsCtrl', ["$scope", "$rootScope", "InstantiationRequestsServices","ENV", function ($scope, $rootScope,InstantiationRequestsServices,ENV) {

        $scope.currentInstantiationRequests= {};
        $scope.InstantiationRequestsFields=[{"type":"textarea","key":"id","templateOptions":{"label":"Id","required":true}},{"type":"textarea","key":"user","templateOptions":{"label":"User","required":true}},{"type":"textarea","key":"descriptorId","templateOptions":{"label":"DescriptorId","required":true}},{"type":"textarea","key":"instanceId","templateOptions":{"label":"InstanceId","required":true}}];

        // retrieve InstantiationRequests to server
        $scope.retrieveInstantiationRequestss = (function(){
            InstantiationRequestsServices.retrieveInstantiationRequestss(ENV)
                .then(function(result){
                    $rootScope.InstantiationRequestss = result;
                    },function(error){
                        alert(error);
                    })
            })();


        $scope.openAddInstantiationRequests=function(){
            $scope.currentInstantiationRequests= {};
            $('#addInstantiationRequests.modal').modal('show');
        }

        // save InstantiationRequests to server
        $scope.saveInstantiationRequests = function(){
            InstantiationRequestsServices.saveInstantiationRequests($scope.currentInstantiationRequests)
            .then(function(result){
                    $rootScope.InstantiationRequestss.push(result);
                },function(error){
                    alert(error);
                })
        }

        $scope.openUpdateInstantiationRequests=function(data){
            $scope.currentInstantiationRequests=angular.copy(data);
            $('#updateInstantiationRequests.modal').modal('show');
        }

        //update data to server
        $scope.updateInstantiationRequests = function(){
            InstantiationRequestsServices.updateInstantiationRequests($scope.currentInstantiationRequests)
            .then(function(result){
                for(var key in $rootScope.InstantiationRequestss){
                    if(result.id==$rootScope.InstantiationRequestss[key].id)
                        $rootScope.InstantiationRequestss[key] = result;
                }
                },function(error){
                    alert(error);
                })
        }

        $scope.openDeleteInstantiationRequests=function(data){
            $scope.currentInstantiationRequests=angular.copy(data);
            $('#deleteInstantiationRequests.modal').modal('show');
        }

        //delete data to server
        $scope.deleteInstantiationRequests = function(){
                InstantiationRequestsServices.deleteInstantiationRequests($scope.currentInstantiationRequests.id)
                .then(function(result){
                    for(var key in $rootScope.InstantiationRequestss){
                        if($scope.currentInstantiationRequests.id==$rootScope.InstantiationRequestss[key].id){
                            $rootScope.InstantiationRequestss.splice(key,1);
                            break;
                        }
                }
                },function(error){
                    alert(error);
                })
        }

        $scope.emptyInstantiationRequests = function(){
            $scope.currentInstantiationRequests={};
        }
    }]);