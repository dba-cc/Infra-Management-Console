app.controller('DBCtrl', function ($scope, $http, $rootScope, NgTableParams, $filter) {
    $rootScope.pageTitle = "Manage Databases";
    $scope.DbList = {};
    $scope.dbname=''
    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.countDB = function () {
        $scope.onlineCount = $filter('filter')($scope.DbList, { name: $scope.searchDB, noc: 'ONLINE' }).length;
        $scope.offlineCount = $filter('filter')($scope.DbList, { name: $scope.searchDB, noc: 'OFFLINE' }).length;
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
    $scope.custom = function (data) {
        dbname = data;
        $scope.showBkPopup();
        document.getElementById('newname').value = dbname;
    }
    $scope.showBkPopup = function () {
        $('.addBkPopup').modal({
            context: '#parent-container',
            closable: false,
            onHidden: function () {
                document.getElementById('newname').value = '';
                document.getElementById('location').value = '';
            }
        }).modal('show');
    };
    $scope.hideBkForm = function () {
        $('.addBkPopup').modal('hide');
    };

/*Create Db Start*/
    $scope.showCreatePopup = function () {
        $('.addCreatePopup').modal({
            context: '#parent-container',
            closable: false,
            onHidden: function () {
                document.getElementById('dbname').value = '';
            }
        }).modal('show');
    };
    $scope.hideCreateForm = function () {
        $('.addCreatePopup').modal('hide');
    };
    $scope.CreateDb = function () {
        var dbname = document.getElementById('dbname').value;
        if (dbname === undefined || dbname === null || dbname === "") {
            $scope.message = 'Error! DataBase name can\'t be empty.'
            showMessage($scope.message)
        }
        else {
            showLoadingScreen();
            $http({
                method: 'POST',
                url: 'api/Database/CreateDatabase',
                data: '"' + dbname +'"',
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
            $scope.hideCreateForm();
        }
    }
    /*Create Db end*/
    ////////////
/*Backup Db Start*/
    $scope.backupDB = function () {
        var location = document.getElementById('location').value;
        var newname = document.getElementById('newname').value;
        if (location === null || location === undefined || location === "" || newname === undefined || newname === null || newname === "") {
            $scope.message = 'Error! File name or Location can\'t be empty.'
            showMessage($scope.message)
        }
        else {
            showLoadingScreen();
            $http({
                method: 'POST',
                url: 'api/Database/BackupDatabase',
                data: {
                    "FrDbName": dbname,
                    "ToDbName": newname,
                    "bkLocation": location
                },
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
            $scope.hideBkForm();
        }
    }
    /*Backup Db End*/
});