app.controller('SPPermissionCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {
    $scope.dropdownUser = function () {
        $('#userDropdown').dropdown();
    }
    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }
    $scope.toggleCheckbox = function (e) {
        checkbox = e.currentTarget.children[0];
        checkbox.click();
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
        console.log('List enabled.')
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
            url: 'api/Permission/GetSPPermissions',
            data: '"'+$scope.User.UserName+' '+$scope.Database.name+'"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.ShowPermissionsFlag = true
                    $scope.PermissionParams = new NgTableParams({
                    }, {
                        dataset: response.obj
                    });
                    $scope.UpdateFormFlag = true;
                    //$scope.TableList = response.obj;
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
            if(value)
                $scope.PermissionParams.data[i].ReadPerm = true;
            else
                $scope.PermissionParams.data[i].ReadPerm = false;
        }
    };

    $scope.checkAllExecute = function (value) {
        var cb = angular.element(document.getElementsByName('Execute'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterexecutecheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].ExecutePerm = true;
            else
                $scope.PermissionParams.data[i].ExecutePerm = false;
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
            var abc = $scope.PermissionParams.data[i];

            $http({
                method: 'POST',
                url: 'api/Permission/GrantSPPermission',
                //data: '"' + abc.UserName + ' ' + abc.DatabaseName + ' ' + abc.TableName + ' ' + abc.ReadPerm + ' ' + abc.WritePerm + ' ' + abc.AlterPerm + ' ' + abc.FullAccessPerm + '"',
                data: abc,
                headers: { "Content-Type": 'application/json' }
            })

                .success(function (response) {
                    if (response.response_code != "200") {
                        showMessage(response.obj);
                        resp = response;
                        //break;
                    }
                    else {
                        //alert(response.obj);
                        resp = response;
                        showMessage(response.obj);
                    }
                    if (i >= $scope.PermissionParams.data.length - 2) {
                        hideLoadingScreen();
                    }
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                    resp = res;
                    hideLoadingScreen();
                    //break;
                });
        }
        showMessage(resp.obj);
    };

});