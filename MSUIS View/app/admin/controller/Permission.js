app.controller('PermissionCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {
    $scope.dropdownUser = function () {
        $('#userDropdown').dropdown();
    }
    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }
    $scope.$watch('User.UserName', function (newValue, oldValue) {
        console.log("ng-model value changed from " + oldValue + " to " + newValue);
    });
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

        var table = angular.element(document.getElementById('example-2'))
        angular.element(document.getElementById('top-table')).rows[0].cells[0].width = table.rows[0].cells[0].width
    };


    $scope.checkAllRead = function (value) {
        //var selectedItems = data.filter(function (DBPermission) {
        //    return DBPermission.ConnectDB.selected;
        //});

        //var currentPage = 1;
        //var totalPages = 0;
        //$scope.items = [];
        //var getElements = function () {
        //    $http.get("http://localhost:51207/index.html#/dashboard/Permission/table?page=" + currentPage).then(function (response) {
        //        $scope.items = $scope.items.concat(response.data.data);
        //        currentPage++;
        //        console.log(response);
        //        if (currentPage <= totalPages) {
        //            getElements();
        //        }
        //    });
        //}
        //// get the total number of pages and the items of the first page
        //$http.get("http://localhost:51207/index.html#/dashboard/Permission/table").then(function (response) {
        //    totalPages = response.data.totalPages;
        //    $scope.items = response.data.data;
        //    currentPage++;
        //    console.log(response);
        //    getElements();
        //});

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
                url: 'api/Permission/GrantPermission',
                data: '"' + abc.UserName + ' ' + abc.DatabaseName + ' ' + abc.TableName + ' ' + abc.ReadPerm + ' ' + abc.WritePerm + ' ' + abc.AlterPerm + ' ' + abc.FullAccessPerm + '"',
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