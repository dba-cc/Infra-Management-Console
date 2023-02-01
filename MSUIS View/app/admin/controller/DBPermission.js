app.controller('DBPermissionCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
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

    $scope.initPermissions = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Permission/GetDBPermissions',
            data: '"'+$scope.User.UserName+'"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.ShowDBPermissionsFlag = true
                    $scope.DBPermissionParams = new NgTableParams({
                    }, {
                        dataset: response.obj
                    });
                    $scope.UpdateDBFormFlag = true;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.checkAllConnectDB = function (value) {
        var cb = angular.element(document.getElementsByName('ConnectDB'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterconnectdbcheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].ConnectDB = true;
            else
                $scope.DBPermissionParams.data[i].ConnectDB = false;
        }
    };

    $scope.checkAllCreateProcedure = function (value) {
        var cb = angular.element(document.getElementsByName('CreateProcedure'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('mastercreateprocedurecheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].CreateProcedure = true;
            else
                $scope.DBPermissionParams.data[i].CreateProcedure = false;
        }
    };

    $scope.checkAllCreateTable = function (value) {
        var cb = angular.element(document.getElementsByName('CreateTable'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('mastercreatetablecheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].CreateTable = true;
            else
                $scope.DBPermissionParams.data[i].CreateTable = false;
        }
    };

    $scope.checkAllCreateView = function (value) {
        var cb = angular.element(document.getElementsByName('CreateView'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('mastercreateviewcheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].CreateView = true;
            else
                $scope.DBPermissionParams.data[i].CreateView = false;
        }
    };

    $scope.checkAllExecute = function (value) {
        var cb = angular.element(document.getElementsByName('Execute'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterexecutecheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].ExecutePerm = true;
            else
                $scope.DBPermissionParams.data[i].ExecutePerm = false;
        }
    };

    $scope.checkAllViewDefinition = function (value) {
        var cb = angular.element(document.getElementsByName('ViewDefinition'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterviewdefinitioncheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].ViewDefinition = true;
            else
                $scope.DBPermissionParams.data[i].ViewDefinition = false;
        }
    };

    $scope.checkAllRead = function (value) {
        var cb = angular.element(document.getElementsByName('Read'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterreadcheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if(value)
                $scope.DBPermissionParams.data[i].ReadPerm = true;
            else
                $scope.DBPermissionParams.data[i].ReadPerm = false;
        }
    };

    $scope.checkAllWrite = function (value) {
        var cb = angular.element(document.getElementsByName('Write'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterwritecheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].WritePerm = true;
            else
                $scope.DBPermissionParams.data[i].WritePerm = false;
        }
    };

    $scope.checkAllAlter = function (value) {
        var cb = angular.element(document.getElementsByName('Alter'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masteraltercheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].AlterPerm = true;
            else
                $scope.DBPermissionParams.data[i].AlterPerm = false;
        }
    };

    $scope.checkAllForeignKey = function (value) {
        var cb = angular.element(document.getElementsByName('ForeignKey'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterforeignkeycheck'))[0].checked
        });

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            if (value)
                $scope.DBPermissionParams.data[i].ReferencesPerm = true;
            else
                $scope.DBPermissionParams.data[i].ReferencesPerm = false;
        }
    };


    $scope.updatePermissions = function () {
        showLoadingScreen();
        $scope.resp = null;

        for (var i = 0; i < $scope.DBPermissionParams.data.length; i++) {
            var abc = $scope.DBPermissionParams.data[i];

            $http({
                method: 'POST',
                url: 'api/Permission/GrantDBPermissions',
                data: abc,
                //data: '"' + abc.UserName + ' ' + abc.DatabaseName + ' ' + abc.ReadPerm + ' ' + abc.WritePerm + ' ' + abc.AlterPerm + ' ' + abc.FullAccessPerm + '"',
                headers: { "Content-Type": 'application/json' }
            })

                .success(function (response) {
                    if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                        resp = response;
                        //break;
                    }
                    else {
                        //alert(response.obj);
                        resp = response;
                    }
                    hideLoadingScreen();
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