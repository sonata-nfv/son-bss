/**
 * Created by Shivali on 6/29/15.
 */

    
        angular.module("NSD",["config"]);
    
        angular.module("InstantiationRequests",["config"]);
    


angular.module("SonataBSS", ["angular-json-tree","ui.router","formly","formlyBootstrap","ngAnimate","angularUtils.directives.dirPagination"

        ,"NSD"

        ,"InstantiationRequests"
    

])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        
            $stateProvider
            
                .state("NSD",{
                    url: "/nSDs",
                    templateUrl: "modules/NSD/nSD/views/nSDs.html",
                    controller: "NSDCtrl"
                    })
                .state("InstantiationRequests",{
                    url: "/InstantiationRequests",
                    templateUrl: "modules/InstantiationRequests/instantiationRequests/views/instantiationRequests.html",
                    controller: "InstantiationRequestsCtrl"
                    })
		
         
        
            $urlRouterProvider.otherwise("/nSDs");
        
    }]);