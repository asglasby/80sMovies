var myApp = angular.module('myApp', ['ngRoute']);
myApp.URL = "https://domo.firebaseio.com/.json";
myApp.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "Views/home.html",
        controller: 'HomeCtrl'
    })
    .when("/editMovie/:id", {
        templateUrl: "Views/AddMovie.html",
        controller: 'editMovie'
    })
    .when("/NewMovie", {
        templateUrl: "Views/AddMovie.html",
        controller: 'addMovie'
    }).otherwise({
        templateUrl: "Views/Error.html"
    });
});
myApp.factory('Movies', function () {
    var movieArray = [{ title: "Top Gun", year: 1986, director: "Someone" },
        { title: "Red Dawn", director: "Tim", year: 1995 },
        { title: "Ghost Busters", year: 1986, director: "Other" }];
    return movieArray;
});
myApp.filter('Reverse', function () {
    return function (text) {
        return text.split("").reverse().join("");
    }
});
myApp.controller('HomeCtrl', function ($scope, Movies) {
    $scope.Movies = Movies;
    $scope.Options = ["title", "director", "year"];
    //$scope.SearchBy = {};
    $scope.search = function (item) {
        for (var x in $scope.SearchBy) {
            if ($scope.SearchBy[x]) {
                if (item[x].toString().toLowerCase().indexOf($scope.query.toLowerCase()) != -1) {
                    return true;
                }
            }
        }
        return false;
        //if (
        //    item.director.indexOf($scope.query) != -1 ||
        //   item.title.indexOf($scope.query) != -1) {
        //    return true;
        //}
        //else { return false; }
    };
});
myApp.controller('editMovie', function ($scope, Movies, $location, $routeParams) {
    $scope.Movie = Movies[$routeParams.id];
    $scope.addMovie = function (Movie) {
        $location.path('/');
    };
    $scope.cancel = function () {
        $scope.Movie = MovieCopy;
        alert(MovieCopy);
        $location.path('/');
    };
});
myApp.controller('addMovie', function ($scope, $http, Movies, $location) {
    $scope.Movies = Movies;
    $scope.addMovie = function (Movie) {
        $scope.Movies.push(Movie);
        $scope.title = "";
        $scope.year = "";
        $scope.director = "";
        $location.path('/');
    };
});