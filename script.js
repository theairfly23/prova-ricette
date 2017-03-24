     var countryApp = angular.module('countryApp', ['ngRoute']);

    countryApp.config(function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'country-list.html',
          controller: 'CountryListCtrl'
        }).
        when('/:countryName', {
          templateUrl: 'country-detail.html',
          controller: 'CountryDetailCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    });

   countryApp.factory('countries', function($http){
      return {
        list: function(callback){
          $http.get('https://prova-ricette.firebaseio.com/.json').success(callback);
        }
      };
    });

    countryApp.controller('CountryListCtrl', function ($scope, countries){
      countries.list(function(countries) {
        $scope.countries = countries;
      });
    });

    countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams, $http){
      $http.get('https://prova-ricette.firebaseio.com/.json').success(function(data) {
        $scope.country = data.filter(function(entry){
          return entry.name === $routeParams.countryName
        })[0];
      });
    });