app.controller('PermissionCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $scope.dropdownUser = function () {
        $('#userDropdown').dropdown();
    }

    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }

    $scope.toggleCheckbox = function (e) {
        angular.element(e.currentTarget.children)[0].click();
    }

    $scope.getUserList = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/User/GetUser',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.UserList = {};
                }
                else {
                    $scope.UserList = response.obj;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.showDatabaselist = function () {
        $scope.showDatabaselistflag = true;
    }

    $scope.getDatabaseList = function () {
        showLoadingScreen();
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
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.initPermissions = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Permission/GetPermissionsByUser',
            data: '"' + $scope.User.UserName + ' ' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.ShowPermissionsFlag = true
                    $scope.PermissionParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                    $scope.UpdateFormFlag = true;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.checkAllRead = function (value) {
        var cb = angular.element(document.getElementsByName('Read'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterreadcheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].ReadPerm = true;
            else
                $scope.PermissionParams.data[i].ReadPerm = false;
        }
    };

    $scope.checkAllWrite = function (value) {
        var cb = angular.element(document.getElementsByName('Write'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterwritecheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].WritePerm = true;
            else
                $scope.PermissionParams.data[i].WritePerm = false;
        }
    };

    $scope.checkAllAlter = function (value) {
        var cb = angular.element(document.getElementsByName('Alter'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masteraltercheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].AlterPerm = true;
            else
                $scope.PermissionParams.data[i].AlterPerm = false;
        }
    };

    $scope.checkAllFullAccess = function (value) {
        var cb = angular.element(document.getElementsByName('FullAccess'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterfullaccesscheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].FullAccessPerm = true;
            else
                $scope.PermissionParams.data[i].FullAccessPerm = false;
        }
    };

    $scope.updatePermissions = function () {
        showLoadingScreen();
        $scope.resp = null;

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            var data = $scope.PermissionParams.data[i];

            $http({
                method: 'POST',
                url: 'api/Permission/GrantPermission',
                data: '"' + data.UserName + ' ' + data.DatabaseName + ' ' + data.TableName + ' ' + data.ReadPerm + ' ' + data.WritePerm + ' ' + data.AlterPerm + ' ' + data.FullAccessPerm + '"',
                headers: { "Content-Type": 'application/json' }
            })

                .success(function (response) {
                    if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                        resp = response;
                    }
                    else {
                        resp = response;
                    }
                    if (i >= $scope.PermissionParams.data.length - 2) {
                        hideLoadingScreen();
                    }
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                    resp = res;
                    hideLoadingScreen();
                });
        }
    };
});