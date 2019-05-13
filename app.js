var app = angular.module('crudApp', ['datatables']);
app.controller('crudController', function($scope, $http){

	$scope.success = false;

    $scope.error = false;
    
    $scope.fetchData = function(){
        $http({
            method: "GET",
            url:'http://localhost:8080/alertas?pesquisa=todos', 
            headers: {
                'Access-Control-Allow-Headers': 'accept, content-type',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*'
            }     
        })
        .success(function(data){
			$scope.lista_alertas = data;
		});
	};
});