'use strict';

angular.module('myApp.championship', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/championship', {
            templateUrl: 'championship/championship.html',
            controller: 'ChampionshipCtrl'
        });
    }])

    .controller('ChampionshipCtrl', ['$scope', function($scope) {
        $scope.driversList = [
            {
                Driver: {
                    givenName: 'Sebastian',
                    familyName: 'Vettel'
                },
                points: 322,
                nationality: "German",
                Constructors: [
                    {name: "Red Bull"}
                ]
            },
            {
                Driver: {
                    givenName: 'Fernando',
                    familyName: 'Alonso'
                },
                points: 207,
                nationality: "Spanish",
                Constructors: [
                    {name: "Ferrari"}
                ]
            }
        ];
    }]);