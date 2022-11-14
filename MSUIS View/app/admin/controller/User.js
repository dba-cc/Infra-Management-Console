app.controller('UserCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "User Management";

    $scope.resetUser = function () {
        $scope.User = {};
    }

    $scope.ClearUser = function () {
        $scope.User.Username = '';
        $scope.User.Password = '';
    }

    $scope.NewAddPage = function () {
        $scope.ShowFormFlag = true;
        $scope.ShowEditFlag = false;
    }
    

    var ProgrammeList = [];
    
    $scope.GetUser = function () {

        var data = new Object();
        //data.id = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/User/GetUser',

            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.UserParams = new NgTableParams({
                    }, {
                            dataset: response.obj
                    });
                    
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }


    $scope.AddUser = function () {

        //$scope.newUser.createdById = $rootScope.id;
        //debugger
        $http({
            method: 'POST',
            url: 'api/User/CreateUser',
            data: $scope.User,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.User = {};
                    $scope.GetUser();
                    $scope.ShowFormFlag = false;
                    //$state.go('CompanyAdd');
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    

    $scope.modifyUser = function (data) {
        $scope.ShowFormFlag = false;
        $scope.ShowEditFlag = true;
        $scope.UserEdit = data;
        $scope.GetUser();
        $(window).scrollTop(0); 
    }

    $scope.editUser = function () {

        $http({
            method: 'POST',
            url: 'api/User/EditUser',
            data: $scope.UserEdit,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.ShowEditFlag = false;
                    $scope.UserEdit = {};
                    $scope.GetUser();
                    $scope.ShowEditFlag = false;
                    //$scope.Company = {};

                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.deleteUser = function (ev, data) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this User?')
            .textContent('')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(function () {

            $http({
                method: 'POST',
                url: 'api/User/DeleteUser',
                data: data,
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {

                    $rootScope.showLoading = false;
                   if (response.response_code != "200") {
                       $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                       $scope.resp = response.obj
                    }
                    else {
                       alert(response.obj);
                       $scope.resp = response.obj
                        $scope.GetUser();
                    }
                })
                .error(function (res) {
                    $scope.resp = res.obj
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                });

        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
        $scope.User = {};
        $scope.GetUser()
        console.log(data)
        console.log($scope.resp)
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