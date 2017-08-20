'use strict';

angular.module('myApp.championship', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/championship', {
            templateUrl: 'championship/championship.html',
            controller: 'ChampionshipCtrl'
        });
    }])

    .factory('ergastAPIservice', function($http) {

        var ergastAPI = {};

        ergastAPI.getDrivers = function() {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
            });
        };

        return ergastAPI;
    })

    .controller('ChampionshipCtrl', ['$scope', '$ergastAPIservice', function($scope, ergastAPIservice) {
        $scope.nameFilter = null;
        $scope.driversList = [];

        ergastAPIservice.getDrivers().success(function (response) {
            //Dig into the responde to get the relevant data
            $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });
    }]);