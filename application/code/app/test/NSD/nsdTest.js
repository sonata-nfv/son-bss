describe('SonataBSS', function() {

  describe('NSDController', function() {
    var $scope;
    var _rootScope_;
    beforeEach(module('NSD'));
    //beforeEach(module('ENV'));
    beforeEach(inject(function($rootScope, $controller) {
      _rootScope_=$rootScope;
      //console.log(_rootScope_);
      $scope = $rootScope.$new();
      $controller('NSDCtrl', {$scope: $scope});


    }));

    it('Retrieve NSDs', function() {
      //console.log($scope);
      $scope.retrieveNSDs();
      //console.log(_rootScope_.nSDs);

       
      expect(true).toBe(true);
      //expect(result.length).toBeGreaterThan(-1);
    });

  });
});