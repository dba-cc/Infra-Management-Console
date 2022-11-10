app.controller('PermissionCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

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

    $scope.initPermissions = function () {

        $http({
            method: 'POST',
            url: 'api/Permission/GetPermissionsByUser',
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
                    //$scope.TableList = response.obj;
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });

        var table = angular.element(document.getElementById('example-2'))
        angular.element(document.getElementById('top-table')).rows[0].cells[0].width = table.rows[0].cells[0].width
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


    $scope.updatePermissions = function () {

        $scope.resp = null;

        for (var i = 0; i < $scope.PermissionParams.data.length; i++) {
            var abc = $scope.PermissionParams.data[i];

            $http({
                method: 'POST',
                url: 'api/Permission/GrantPermission',
                data: '"' + abc.UserName + ' ' + abc.DatabaseName + ' ' + abc.TableName + ' ' + abc.ReadPerm + ' ' + abc.WritePerm + ' ' + abc.AlterPerm + '"',
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