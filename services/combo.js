'use strict';

angular
    .module('app.services', [])
    .constant('BASE_URL', 'http://localhost:8080/combos')
    .factory('ShowCombo', showCombo);
    
function showCombo($http, BASE_URL){
    var data = {
        'comboTipo': comboTipo,
        'comboPonto': comboPonto
    };

    function comboTipo() {
        var select = [];
        $http({
            method: "GET",
            url: BASE_URL + '/tipo', 
            headers: {
                'Access-Control-Allow-Headers': 'accept, content-type',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*'
            }     
        }) 
        .success(function(data){
            var obj = {id: "", name: "Selecionar Tipo"}
            select.push(obj);
            $.each(data, function(key, value){
                obj = { id: value, name: value}
                select.push(obj);
            })
            
            return select;
        });

        return select;
    }
         
    function comboPonto() {
        var select = [];
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
            var obj = {id: "", name: "Selecionar Ponto de venda"}
            select.push(obj);
            $.each(data, function(key, value){                
                obj = { id: value, name: value}
                select.push(obj);
            })
            
			return select;
        });

        return select;
    }

    return data;
};