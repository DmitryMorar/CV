angular.module('todoApp', []).
controller('todoController', ['$scope', function ($scope) {
    $scope.items = [];
    $scope.idCount = 0;

    $scope.error = {visible : false};        
    $scope.errorStyle = {'color': '#ff0000'};
    
    $scope.addItem = function () {
        if ($scope.inputValue !== '' && $scope.inputValue !== undefined) {
            $scope.error = {visible : false};
            $scope.items.push({'txt': $scope.inputValue, id: $scope.idCount});
            $scope.inputValue = '';
            $scope.idCount++;

        } else {
            $scope.error = {visible : true};
        }
    };

    $scope.removeItem = function (item) {


        for (var i = 0; i < $scope.items.length; i++) {
            if (item.id == $scope.items[i].id) {
                console.log($scope.items[i].id + ' до');

                $scope.items.splice(i, 1);
                $scope.idCount--;
                break
            }
        }
    };
	
}]);
