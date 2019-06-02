'use strict';

angular
    .module('app.api', [])
    .constant('BASE_URL', 'http://localhost:8080')
    .factory('apiService', apiService);
    
function apiService($http, BASE_URL){
    var data = {
        'getAPI': getAPI
    };

    function getAPI(filtro) {
        var response_api = [];
        $http({
            method: "GET",
            url: BASE_URL + '/alertas?' + filtro, 
            headers: {
                'Access-Control-Allow-Headers': 'accept, content-type',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*'
            }     
        })
        .success(function(data){
            $.each(data, function(key, value){
                response_api.push(value);
            })
            return response_api
        });
        
        return response_api;
    }

    return data;
};