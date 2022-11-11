app.controller('QueryHitCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval) {

    $scope.FetchQueryHitList = function () {

        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: 5,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.QueryHitParams = new NgTableParams({
                    }, {
                        dataset: response.obj
                    });
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });

        stopp = $interval(function () {
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: 5,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.QueryHitParams = new NgTableParams({
                    }, {
                        dataset: response.obj
                    });
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
        }, 5000);
    };

    $scope.$on('$destroy', function () {
        if (angular.isDefined(stopp)) {
            $interval.cancel(stopp);
            stopp = undefined;
        }
    });

});