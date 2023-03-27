app.controller('PermissionCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $scope.showUserDropdown = false;
    $scope.showDBRolesCheck = false;
    $scope.modifiedPermissions = {}
    $scope.check = true;
    $scope.dropdownUser = function () {
        $('#userDropdown').dropdown();
    }

    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }

    $scope.toggleCheckbox = function (e, table, permission) {
        checkbox = e.currentTarget.children[0];
        checkbox.click();
        setTimeout(function () {
            if ($scope.modifiedPermissions[table] == undefined) {
                $scope.modifiedPermissions[table] = {};
            }
            $scope.modifiedPermissions[table][permission] = e.currentTarget.children[1].classList.contains('check')
        }, 100)
    }

/*    $scope.showDatabaselist = function () {
        $scope.showDatabaselistflag = true;
    }*/

    $scope.GetUser = function () {
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
        $scope.showDBRolesCheck = true;
        var user = $scope.User.UserName;
        user = user.replace(/\\/g, "\\\\");
        var db = $scope.Database.name;
        var data = '"' + String.raw`${user}` + ',' + String.raw`${db}` + '"';
        if ($scope.check) {
            $scope.check = false;
            $http({
                method: 'POST',
                url: 'api/Permission/GetPermissionsByUser',
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
            $scope.check = true;
            $http({
                method: 'POST',
                url: 'api/Permission/GetTablePermissionsByDBRoles',
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

    $scope.checkAllSelect = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].SELECT = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName].SELECT = value.currentTarget.checked
        }
    };

    $scope.checkAllInsert = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].INSERT = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName].INSERT = value.currentTarget.checked
        }
    };

    $scope.checkAllUpdate = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].UPDATE = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName].UPDATE = value.currentTarget.checked
        }
    };

    $scope.checkAllDelete = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].DELETE = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName].DELETE = value.currentTarget.checked
        }
    };

    $scope.checkAllAlter = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].ALTER = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName].ALTER = value.currentTarget.checked
        }
    };

    $scope.checkAllControl = function (value) {
        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            $scope.PermissionParams.data[i].CONTROL = value.currentTarget.checked;
            if ($scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] == undefined) {
                $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName] = {}
            }
            $scope.modifiedPermissions[$scope.PermissionParams.data[i].TableName].CONTROL = value.currentTarget.checked
        }
    };

    $scope.updatePermissions = function () {
        showLoadingScreen();
        var success_count = 0;
        var error_count = 0;
        for (table in $scope.modifiedPermissions) {
            var data = {
                'user': $scope.User.UserName,
                'database': $scope.Database.name,
                'table': table,
                "SELECT": $scope.modifiedPermissions[table].SELECT != undefined ? $scope.modifiedPermissions[table].SELECT : null,
                "INSERT": $scope.modifiedPermissions[table].INSERT != undefined ? $scope.modifiedPermissions[table].INSERT : null,
                "UPDATE": $scope.modifiedPermissions[table].UPDATE != undefined ? $scope.modifiedPermissions[table].UPDATE : null,
                "DELETE": $scope.modifiedPermissions[table].DELETE != undefined ? $scope.modifiedPermissions[table].DELETE : null,
                'ALTER': $scope.modifiedPermissions[table].ALTER != undefined ? $scope.modifiedPermissions[table].ALTER : null,
                'CONTROL': $scope.modifiedPermissions[table].CONTROL != undefined ? $scope.modifiedPermissions[table].CONTROL : null
            }
            $http({
                method: 'POST',
                url: 'api/Permission/UpdateTablePermissions',
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