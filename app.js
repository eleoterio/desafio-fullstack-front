var app = angular.module('app', ['datatables', 'app.services', 'app.api']);
app.controller('viewController', function($scope, $http, ShowCombo, apiService) {

	$scope.success = false;

    $scope.error = false;
    
    $scope.combo = {
        Tipo: [],
        TipoModel: null,
        Ponto: [],
        PontoModel: null,
    };

    $scope.fetchData = function(){
        
        $scope.carregarTabela();
        
        $scope.combo.Tipo = ShowCombo.comboTipo();
        $scope.combo.Ponto = ShowCombo.comboPonto();
        
    };

    $scope.carregarTabela = function _carregarTabela() {
        let tipo = $scope.combo.TipoModel;
        let ponto = $scope.combo.PontoModel;

        let filtro = "";

        if (tipo && ponto) {
            filtro = "pesquisa=localtipo"
            filtro += "&ponto_de_venda=" + ponto
            filtro += "&tipo=" + tipo
        } else if (tipo) {
            filtro = "pesquisa=tipo"
            filtro += "&tipo=" + tipo
        } else if(ponto) {
            filtro = "pesquisa=local"
            filtro += "&ponto_de_venda=" + ponto
        } else {
            filtro = "pesquisa=todos"
        }
        
        $scope.lista_alertas = apiService.getAPI(filtro);
    }    

});