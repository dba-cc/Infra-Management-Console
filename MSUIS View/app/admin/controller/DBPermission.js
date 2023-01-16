app.controller('DBPermissionCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.getUserList = function () {

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

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    //$scope.showDatabaselist = function () {
    //    $scope.showDatabaselistflag = true;
    //}

    //$scope.getDatabaseList = function () {

    //    $http({
    //        method: 'POST',
    //        url: 'api/Database/GetDatabase',
    //        headers: { "Content-Type": 'application/json' }
    //    })

    //        .success(function (response) {
    //            if (response.response_code == "201") {
    //                $scope.DatabaseList = {};
    //            }
    //            else {
    //                $scope.DatabaseList = response.obj;
    //            }

    //        })
    //        .error(function (res) {
    //            $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
    //        });
    //};

    $scope.initPermissions = function () {

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
                    $scope.ShowPermissionsFlag = true
                    $scope.PermissionParams = new NgTableParams({
                    }, {
                        dataset: response.obj
                    });
                    $scope.UpdateFormFlag = true;
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };



    $scope.checkAllConnectDB = function (value) {
        var cb = angular.element(document.getElementsByName('ConnectDB'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterconnectdbcheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].ConnectDB = true;
            else
                $scope.PermissionParams.data[i].ConnectDB = false;
        }
    };

    $scope.checkAllCreateProcedure = function (value) {
        var cb = angular.element(document.getElementsByName('CreateProcedure'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('mastercreateprocedurecheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].CreateProcedure = true;
            else
                $scope.PermissionParams.data[i].CreateProcedure = false;
        }
    };

    $scope.checkAllCreateTable = function (value) {
        var cb = angular.element(document.getElementsByName('CreateTable'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('mastercreatetablecheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].CreateTable = true;
            else
                $scope.PermissionParams.data[i].CreateTable = false;
        }
    };

    $scope.checkAllCreateView = function (value) {
        var cb = angular.element(document.getElementsByName('CreateView'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('mastercreateviewcheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].CreateView = true;
            else
                $scope.PermissionParams.data[i].CreateView = false;
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

    $scope.checkAllViewDefinition = function (value) {
        var cb = angular.element(document.getElementsByName('ViewDefinition'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterviewdefinitioncheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].ViewDefinition = true;
            else
                $scope.PermissionParams.data[i].ViewDefinition = false;
        }
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

    $scope.checkAllForeignKey = function (value) {
        var cb = angular.element(document.getElementsByName('ForeignKey'))
        console.log(cb)
        angular.forEach(cb, function (value) {
            value.checked = angular.element(document.getElementsByName('masterforeignkeycheck'))[0].checked
        });

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            if (value)
                $scope.PermissionParams.data[i].ReferencesPerm = true;
            else
                $scope.PermissionParams.data[i].ReferencesPerm = false;
        }
    };


    $scope.updatePermissions = function () {

        $scope.resp = null;

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            var abc = $scope.PermissionParams.data[i];

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

                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                    resp = res;
                    //break;
                });
        }
        alert(resp.obj);
    };


    //$scope.NewAddPage = function () {
    //    $state.go('CompanyAdd');
    //}

    //$scope.backToList = function () {
    //    $state.go('CompanyEdit');
    //}

    

    //$scope.getProgramme = function () {
    //    //alert("Faculty Details");
    //    $http({
    //        method: 'POST',
    //        url: 'api/Department/ProgGet',
    //        data: $scope.Department,
    //        headers: { "Content-Type": 'application/json' }
    //    })

    //        .success(function (response) {
    //            $scope.ProgList = response.obj;

    //            //$scope.TestCountry = {
    //            //};
    //        })
    //        .error(function (res) {
    //            //alert(res);
    //        });
    //};

});