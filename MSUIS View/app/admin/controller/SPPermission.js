app.controller('SPPermissionCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $scope.showUserDropdown = false
    $scope.modifiedPermissions = {}
    $scope.showSPDBRolesCheck = false;
    $scope.checkSP = true;
    $scope.dropdownUser = function () {
        $('#userDropdown').dropdown();
    }

    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }

    $scope.toggleCheckbox = function (e, sp, permission) {
        checkbox = e.currentTarget.children[0];
        checkbox.click();
        setTimeout(function() {
            if ($scope.modifiedPermissions[sp] == undefined) {
                $scope.modifiedPermissions[sp] = {};
            }
            $scope.modifiedPermissions[sp][permission] = e.currentTarget.children[1].classList.contains('check')
        }, 100)
    }

    $scope.getUserList = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/User/GetUser',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $scope.UserList = {}
                }
                else {
                    $scope.UserList = response.obj
                    $scope.showUserDropdown = true
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }

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
        $scope.showSPDBRolesCheck = true;
        var user = $scope.User.UserName;
        user = user.replace(/\\/g, "\\\\");
        var db = $scope.Database.name;
        var data = '"' + String.raw`${user}` + ',' + String.raw`${db}` + '"';
        if ($scope.checkSP) {
            $scope.checkSP = false;
            $http({
                method: 'POST',
                url: 'api/Permission/GetStoredProcedurePermissions',
                data: data,
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
        } else {
            $scope.checkSP = true;
            $http({
                method: 'POST',
                url: 'api/Permission/GetSPDBRolesPermissions',
                data: data,
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
        }
    };

    $scope.checkAllControl = function (value) { 
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].CONTROL = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName].CONTROL = value.currentTarget.checked
        }
    };

    $scope.checkAllExecute = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].EXECUTE = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName].EXECUTE = value.currentTarget.checked
        }
    };

    $scope.checkAllAlter = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].ALTER = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName].ALTER = value.currentTarget.checked
        }
    };

    $scope.checkAllViewdefinition = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].VIEWDEFINITION = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].SPName].VIEWDEFINITION = value.currentTarget.checked
        }
    };

    $scope.updatePermissions = function () {
        showLoadingScreen();
        var success_count = 0;
        var error_count = 0;
        for (sp in $scope.modifiedPermissions) {
            var data = {
                'user': $scope.User.UserName,
                'database': $scope.Database.name,
                'SPName': sp,
                'EXECUTE': $scope.modifiedPermissions[sp].EXECUTE != undefined ? $scope.modifiedPermissions[sp].EXECUTE : null,
                'ALTER': $scope.modifiedPermissions[sp].ALTER != undefined ? $scope.modifiedPermissions[sp].ALTER : null,
                'CONTROL': $scope.modifiedPermissions[sp].CONTROL != undefined ? $scope.modifiedPermissions[sp].CONTROL : null,
                'VIEWDEFINITION': $scope.modifiedPermissions[sp].VIEWDEFINITION != undefined ? $scope.modifiedPermissions[sp].VIEWDEFINITION : null,
            }
            $http({
                method: 'POST',
                url: 'api/Permission/UpdateStoredProcedurePermissions',
                data: data,
                headers: { "Content-Type": 'application/json' }
            })

                .success(function (response) {
                    if (response.response_code != "200") {
                        error_count++;
                        if (Object.keys($scope.modifiedPermissions).length - 1 == success_count + error_count) {
                            hideLoadingScreen();
                            showMessage('Permission Update : ' + success_count + ' Succeed, ' + error_count + ' Failed.')
                        }
                    } else {
                        success_count++;
                    }
                    if (Object.keys($scope.modifiedPermissions).length == success_count + error_count) {
                        hideLoadingScreen();
                        showMessage('Permission Update : ' + success_count + ' Succeed, ' + error_count + ' Failed.')
                    }
                })
                .error(function (res) {
                    error_count++;
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                    if (Object.keys($scope.modifiedPermissions).length - 1 == success_count + error_count) {
                        hideLoadingScreen();
                        showMessage('Permission Update : ' + success_count + ' Succeed, ' + error_count + ' Failed.')
                    }
                }); 
        }
    };
});