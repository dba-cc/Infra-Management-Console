app.controller('DBPermissionCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.roleDropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.showAssignRolePopup = function () {
        $('.assignRolePopup').modal({
            context: '.parent-container'
        }).modal('show');
    }

    $scope.hideAssignRolePopup = function () {
        $('.assignRolePopup').modal('hide');
    }

    $scope.toggleCheckbox = function (e) {
        checkbox = e.currentTarget.children[0];
        checkbox.click();
    }

    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }

    $scope.getUser = function () {
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
                    $scope.GetPossibleRoles();
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

    $scope.GetPossibleRoles = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Permission/GetPossibleRoles',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.allRoles = {};
                }
                else {
                    $scope.allRoles = response.obj;
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
            url: 'api/Permission/GetDBRoles',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                $scope.DBRoleParams = {};
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.DBRoleParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                    $scope.showAssignRole = true;
                    $scope.getUser();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.GrantDatabaseRoleToUser = function () {
        if ($scope.Role == undefined || $scope.User.UserName == undefined) {
            showMessage('Error : All fields are required!');
            return;
        }
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Permission/GrantDBRole',
            data: '"' + $scope.Database.name + ' ' + $scope.Role + ' ' + $scope.User.UserName + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    showMessage(response.obj);
                }
                else {
                    showMessage(response.obj);
                    $scope.hideAssignRolePopup();
                    $scope.initPermissions();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.RevokeDatabaseRoleToUser = function () {
        showLoadingScreen();

        $http({
            method: 'POST',
            url: 'api/Permission/DropUserFromRole',
            data: '"' + $scope.Database.name + ' ' + $scope.roleDrop + ' ' + $scope.userDrop + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    showMessage(response.obj)
                }
                else {
                    showMessage(response.obj);
                    $scope.hideDropPopup();
                    $scope.initPermissions();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.showDropPopup = function (user, role) {
        $scope.userDrop = user;
        $scope.roleDrop = role;
        $('.dropPopup').modal({
            context: '.parent-container'
        }).modal('show');
    }

    $scope.hideDropPopup = function () {
        $('.dropPopup').modal('hide');
    };
});