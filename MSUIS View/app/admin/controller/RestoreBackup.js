app.controller('RBCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $scope.getFiles = function () {

        $http({
            method: 'POST',
            url: 'api/RB/FCGet',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.FileList = {};
                }
                else {
                    $scope.FileList = response.obj
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.RestoreBackup = function () {

        $http({
            method: 'POST',
            url: 'api/RB/RestoreBackup',
            data: $scope.RB,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    alert(response.obj);
                }
                else {
                    alert(response.obj);
                }

            })
            .error(function (res) {
                alert(response.obj);
            });
    };
    $scope.showDatabaselist = function () {
        $scope.showDatabaselistflag = true;
    }

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