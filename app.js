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
        
        $http({
            method: "GET",
            url:'http://localhost:8080/combos/ponto-de-venda', 
            headers: {
                'Access-Control-Allow-Headers': 'accept, content-type',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*'
            }     
        })
        .success(function(data){
            let select = [];
            var obj = {id: "", name: "Selecionar Ponto de venda"}
            select.push(obj);
            $.each(data, function(key, value){                
                obj = { id: value, name: value}
                select.push(obj);
            })

			$scope.combo = {
                model: null,
                comboPonto: select
            };
        });
        
        $http({
            method: "GET",
            url:'http://localhost:8080/combos/tipo', 
            headers: {
                'Access-Control-Allow-Headers': 'accept, content-type',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*'
            }     
        })
        .success(function(data){
            let select = [];
            var obj = {id: "", name: "Selecionar Tipo"}
            select.push(obj);
            $.each(data, function(key, value){
                obj = { id: value, name: value}
                select.push(obj);
            })
            
			$scope.data = {
                model: null,
                comboTipo: select
            };
        });
    };
    $("#comboPonto").on('change', function() {
        carregarTabela()
    });
    
    $("#comboTipo").on('change', function() {
        carregarTabela()
    });
    function carregarTabela(){
        let tipo = $("#comboTipo").val();
        let ponto = $("#comboPonto").val();
        let filtro = "";
        if (tipo != "" && ponto != "") {
            filtro = "pesquisa=localtipo"
            filtro += "&ponto_de_venda=" + ponto
            filtro += "&tipo=" + tipo
        } else if (tipo != "") {
            filtro = "pesquisa=tipo"
            filtro += "&tipo=" + tipo
        } else if(ponto != "") {
            filtro = "pesquisa=local"
            filtro += "&ponto_de_venda=" + ponto
        } else {
            filtro = "pesquisa=todos"
        }
    
        $http({
            method: "GET",
            url:'http://localhost:8080/alertas?' + filtro, 
            headers: {
                'Access-Control-Allow-Headers': 'accept, content-type',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*'
            }     
        })
        .success(function(data){
            $scope.lista_alertas = data;
        });
    }
});