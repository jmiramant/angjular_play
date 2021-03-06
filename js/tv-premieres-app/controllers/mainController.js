app.controller("mainController", function($scope, $http){
    $scope.apiKey = "e505f154b267536e1ce951065375f0d1";
    $scope.results = [];
    $scope.filterText = null;
    $scope.availableGenres = [];
    $scope.genreFilter = null;
    $scope.init = function() {
        var today = new Date();
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
        $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
            angular.forEach(data, function(value, index){
                var date = value.date;
                angular.forEach(value.episodes, function(tvshow, index){
                    tvshow.date = date;
                    $scope.results.push(tvshow);
                    angular.forEach(tvshow.show.genres, function(genre, index){
                        var exists = false;
                        angular.forEach($scope.availableGenres, function(avGenre, index){
                            if (avGenre == genre) {
                                exists = true;
                            }
                        });
                        if (exists === false) {
                            $scope.availableGenres.push(genre);
                        }
                    });
                });
            });
        }).error(function(error) {
 
        });
    };
});