app.controller('studentsCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Manage Users";


    $scope.userTypeList = [
        {
            id: "1",
            name: "Admin"
        },
        {
            id: "2",
            name: "Account"
        },
        {
            id: "1",
            name: "Employee"
        }
    ];

    $scope.userList = [
        {
            id: "1",
            name: "Dhruv",
            email: "dhruv@gmail.com",
            mobile: "0000000000",
            status: true
        },
        {
            id: "2",
            name: "Anish",
            email: "anish@gmail.com",
            mobile: "1111111111",
            status: true
        },
        {
            id: "3",
            name: "Keval",
            email: "keval@gmail.com",
            mobile: "1111100000",
            status: false
        },
    ];

    $scope.userTableParams = new NgTableParams({
    }, {
            dataset: $scope.userList
    });

    $scope.resetUser = function () {
        $scope.user = {};
    }

    $scope.getUserList = function () {

        var data = new Object();
        data.id = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Admin/getAdminList',
            data: data,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.userTableParams = new NgTableParams({
                    }, {
                            dataset: response.obj
                        });
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }
//    $scope.getUserList();

    $scope.addUser = function () {

        $scope.newUser.createdById = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Admin/addAdmin',
            data: $scope.newUser,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.newUser = {};
                    $scope.getUserList();
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    $scope.cancelUser = function () {
        $scope.newUser = {};
        $scope.modifyUserFlag = false;
    }

    $scope.modifyUserData = function (data) {
        $scope.newUser = data;
        $scope.modifyUserFlag = true;
    }

    $scope.modifyUser = function () {

        $scope.newUser.createdById = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Admin/updateAdmin',
            data: $scope.newUser,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.newUser = {};
                    $scope.getUserList();
                    $scope.modifyUserFlag = false;

                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.showUser = function (data) {

        data.createdById = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Admin/showAdmin',
            data: data,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.getUserList();
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.hideUser = function (data) {

        data.createdById = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Admin/hideAdmin',
            data: data,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.getUserList();
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

});