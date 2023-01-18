app.controller('QueryHitCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval) {

    $scope.Query = {};

    $scope.showQuerylistflag = true;

    $scope.init = function () {
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: '5',
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
    };

    $scope.check = function () {
        if ($scope.query.querycount.$invalid) {
            $scope.Show = true;
        } else {
            $scope.Show = false;
            $scope.FetchQueryHitList();
        }

    };

    $scope.FetchQueryHitList = function () {

        $scope.showQuerylistflag = true;

        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: $scope.Query.count,
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

    };
});