app.controller('DBCtrl', function ($scope, $http, $rootScope, NgTableParams, $filter) {
    $rootScope.pageTitle = "Manage Databases";
    $scope.DbList = {};

    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.getDatabaseList = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Database/GetDBWithStates',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.DatabaseList = {};
                }
                else {
                    $scope.DatabaseList = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });

                    $scope.DbList = response.obj;
                    $scope.onlineCount = $filter('filter')($scope.DbList, { name: $scope.searchDB, noc: 'ONLINE' }).length;
                    $scope.offlineCount = $filter('filter')($scope.DbList, { name: $scope.searchDB, noc: 'OFFLINE' }).length;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.stopDB = function (database) {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Database/StopDB',
            data: '"' + database + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                showMessage(response.obj);
                $scope.getDatabaseList();
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                $scope.getDatabaseList();
                hideLoadingScreen();
            });
    }

    $scope.startDB = function (database) {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Database/StartDB',
            data: '"' + database + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                showMessage(response.obj);
                $scope.getDatabaseList();
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                $scope.getDatabaseList();
                hideLoadingScreen();
            });
    }

    $scope.restartDB = function (database) {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Database/RestartDB',
            data: '"' + database + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                showMessage(response.obj);
                $scope.getDatabaseList();
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                $scope.getDatabaseList();
                hideLoadingScreen();
            });
    }
});