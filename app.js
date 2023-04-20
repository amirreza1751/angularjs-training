var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })

        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })

        .when('/second/:id', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })
});

myApp.service('nameService', function (){
    var self = this;
    this.name = 'Amirreza';
    this.nameLength = function (){
        return self.name.length;
    }
});

myApp.controller('mainController', ['$scope', '$log', 'nameService',
    function($scope, $log, nameService) {
    $scope.name = nameService.name;

    $scope.$watch('name', function (){
        nameService.name = $scope.name;
    });

    $log.info(nameService.name);
    $log.info(nameService.nameLength());

        $scope.people = [
            {
                name: 'John Doe',
                address: '555 Main St.',
                city: 'New York',
                state: 'NY',
                zip: '11111'
            },
            {
                name: 'Jane Doe',
                address: '333 Second St.',
                city: 'Buffalo',
                state: 'NY',
                zip: '22222'
            },
            {
                name: 'George Doe',
                address: '111 Third St.',
                city: 'Miami',
                state: 'FL',
                zip: '33333'
            }
        ]

        $scope.formattedAddress = function(person) {

            return person.address + ', ' + person.city + ', ' + person.state + ' ' + person.zip;

        };
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'nameService',
    function($scope, $log, $routeParam, nameService) {
    // $scope.name = 'second';
    $scope.$watch('name', function (){
        nameService.name = $scope.name;
    });
    $scope.id = $routeParam.id || 0;
    $scope.name = nameService.name;
}]);

myApp.directive('searchResult', function (){
    return {
        restrict: 'ACEM',
        // template: '<a><h3>Item: 1</h3><p>Description</p></a>',
        templateUrl: 'pages/search-result.html',
        replace: true,
        transclude: true,
        scope: {
            person: '=',
            formattedAddress: '&'
        },
        link: function (scope, element, attrs){
            if (scope.person.name === 'John Doe'){
                element.addClass("btn-success");
            } else {
                element.addClass("btn-danger");
            }

        }
    }
});
