app.controller('PermReportCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval) {

    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }
    $scope.initPermReport = function () {
        console.log($scope.Database.name)
            $http({
                method: 'POST',
                url: 'api/PermReport/PermReport',
                data: '"'+$scope.Database.name+'"',
                headers: { "Content-Type": 'application/json' }
            })

                .success(function (response) {
                    if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    }
                    else {
                        $scope.PermReportParams = new NgTableParams({
                        }, {
                            dataset: response.obj
                        });
                    }
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                });
    };

    $scope.getDatabaseList = function () {

        $http({
            method: 'POST',
            url: 'api/Database/GetDatabase',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.DatabaseList = {};
                }
                else {
                    $scope.DatabaseList = response.obj;
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

});