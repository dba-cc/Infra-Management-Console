app.controller('RBCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {
    $scope.fileDropdown = function () {
        $('.ui.dropdown').dropdown();
    }

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
                    console.log($scope.FileList)
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });

        
    };

    $scope.RestoreBackup = function () {
        if ($scope.destDB === undefined) {
            showMessage('Enter Destination Database!')
            return
        }
        var RB = {
            FrDbName: $scope.FrDbName,
            ToDbName: $scope.destDB
        }
        $http({
            method: 'POST',
            url: 'api/RB/RestoreBackup',
            data: RB,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    showMessage(response.obj);
                }
                else {
                    showMessage(response.obj);
                }

            })
            .error(function (res) {
                showMessage(res.obj);
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