/**
 * Created by Shivali on 6/30/15.
 */

angular.module('NSD')
    .factory('NSDServices',["$http","$q",function ($http,$q) {
        return {
            retrieveNSDs:function(ENV){

                var defer=$q.defer();
		$http.get(ENV.apiEndpoint+"/services/")
                    .success(function(result){
					defer.resolve(result)})
                    .error(function(error){defer.reject(error)});
                return defer.promise;
            },
          
            instantiateNSD:function(id,ENV){				
                var defer=$q.defer();
				console.log('Id '+ id + ",ENV: "+ENV);
                $http.post(ENV.apiEndpoint+"/requests",{"service_id":id})
                    .success(function(result){console.log('EXITO!!!!!!');defer.resolve(result)})
                    .error(function(error){console.log('FRACASO!!!!!!');defer.reject(error)});
				
                return defer.promise;
            }/*,
            retrieveNSDById:function(id,ENV){

                var defer=$q.defer();
                $http.get(ENV.apiEndpoint||"/services/")
                    .success(function(result){defer.resolve(result)})
                    .error(function(error){defer.reject(error)});
                return defer.promise;
            }*/
        }
    }]);