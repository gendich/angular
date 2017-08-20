'use strict';

angular.module('myApp.championship', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/championship', {
            templateUrl: 'championship/championship.html',
            controller: 'ChampionshipCtrl',
            factory: 'ergastAPIservice'
        });
    }])

    .factory('ergastAPIservice', '$http', function ($http) {
        console.log($http);
        var ergastAPI = {};

        ergastAPI.getDrivers = function () {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
            });
        };

        return ergastAPI;
    })

    .controller('ChampionshipCtrl', ['$scope', 'ergastAPIservice', function ($scope, ergastAPIservice) {
        console.log(ergastAPIservice);
        $scope.nameFilter = null;
        $scope.driversList = [];
        $scope.searchFilter = function (driver) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
        };
        ergastAPIservice.getDrivers().success(function (response) {
            //Dig into the responde to get the relevant data
            $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });
    }]);