app.controller('PermissionCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Permission Management";

    $scope.resetPermission = function () {
        $scope.Permission = {};
    }
    
    $scope.getPermission = function () {

        var data = new Object();
        //data.id = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Worker/WorkerGet',
            data: data,

            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.WorkerTableParams = new NgTableParams({
                    }, {
                            dataset: response.obj
                    });
                    
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }


    $scope.addWorker = function () {
        //debugger
            $http({
            method: 'POST',
            url: 'api/Worker/Worker_Insert',
            data: $scope.Worker,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.Worker = {};
                    $scope.getWorker();
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    

    $scope.modifyWorker = function (data) {
        
        $scope.ShowFormFlag = true;
        $scope.Worker = data;
        $scope.getWorker();
        $(window).scrollTop(0); 
    }

    $scope.editWorker = function () {

        $http({
            method: 'POST',
            url: 'api/Worker/Worker_Update',
            data: $scope.Worker,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.showFormFlag = false;
                    $scope.Worker = {};
                    $scope.getWorker();
                    //$scope.Company = {};

                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.deleteWorker = function (ev, data) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete?')
            .textContent('')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(function () {
            $scope.Worker = data;

            $http({
                method: 'POST',
                url: 'api/Worker/Worker_Delete',
                data: $scope.Worker,
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {

                    $rootScope.showLoading = false;
                    if (response.response_code == "0") {
                        $state.go('login');

                    } else if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    }
                    else {
                        alert(response.obj);
                        $scope.getWorker();
                    }
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                });

        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.getCompanyList = function () {

        $http({
            method: 'POST',
            url: 'api/Worker/Get_Company',
            //data: $scope.FacultyInstituteMap,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.CompanyList = {};
                }
                else {
                    $scope.CompanyList = response.obj;
                }

            })
            .error(function (res) {

            });
    };

    $scope.getUserList = function () {

        $http({
            method: 'POST',
            url: 'api/User/GetUser',
            //data: $scope.FacultyInstituteMap,
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

            });
    };

    $scope.getDatabaseList = function () {

        $http({
            method: 'POST',
            url: 'api/Database/GetDatabase',
            //data: $scope.FacultyInstituteMap,
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

            });
    };

    $scope.getTableList = function () {

        $http({
            method: 'POST',
            url: 'api/Table/GetTable',
            data: $scope.Database,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.TableList = {};
                }
                else {
                    $scope.TableList = response.obj;
                }

            })
            .error(function (res) {

            });
    };

    $scope.showDatabaselist = function () {
        $scope.showDatabaselistflag = true;
    }

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

            });
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