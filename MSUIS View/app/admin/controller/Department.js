app.controller('DeptCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Manage MstFacultyDemo";

    $scope.resetDepartment = function () {
        $scope.Department = {};
    }
    

    var ProgrammeList = [];
    
    $scope.getDepartment = function () {

        var data = new Object();
        //data.id = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Department/DeptGet',
            data: data,

            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.DepartmentTableParams = new NgTableParams({
                    }, {
                            dataset: response.obj
                    });
                    
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }


    $scope.addDepartment = function () {

        //$scope.newUser.createdById = $rootScope.id;
        //debugger
        $http({
            method: 'POST',
            url: 'api/Department/DeptAdd',
            data: $scope.Department,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.Department = {};
                    $scope.getDepartment();
                    $state.go('DepartmentEdit');
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    

    $scope.modifyDept = function (data) {
        
        $scope.ShowFormFlag = true;
        $scope.Department = data;
        $scope.getDepartment();
        $scope.getProgramme();
        $(window).scrollTop(0); 
    }

    $scope.editDepartment = function () {

        $http({
            method: 'POST',
            url: 'api/Department/DepartmentUpdate',
            data: $scope.Department,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.showFormFlag = false;
                    $scope.getDepartment();
                    $scope.Department = {};

                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.deleteDepartment = function (ev, data) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete?')
            .textContent('')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(function () {
            $scope.Department = data;

            $http({
                method: 'POST',
                url: 'api/Department/DepartmentDelete',
                data: $scope.Department,
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
                        $scope.getDepartment();
                    }
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                });

        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };


    $scope.NewAddPage = function () {
        $state.go('DepartmentAdd');
    }

    $scope.backToList = function () {
        $state.go('DepartmentEdit');
    }

    

    $scope.getProgramme = function () {
        //alert("Faculty Details");
        $http({
            method: 'POST',
            url: 'api/Department/ProgGet',
            data: $scope.Department,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                $scope.ProgList = response.obj;

                //$scope.TestCountry = {
                //};
            })
            .error(function (res) {
                //alert(res);
            });
    };

});