app.controller('UserCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "User Management";

    $scope.ClearUser = function () {
        $scope.User.Username = '';
        $scope.User.Password = '';
    }

    $scope.showPassword = false;
    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    };

    $scope.GetUser = function () {
        showLoadingScreen();
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
                        dataset: response.obj,
                    });

                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }

    $scope.AddUser = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/User/CreateUser',
            data: $scope.User,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    if (response.obj == 'Bad Password' || response.obj == 'Record already exists.') {
                        document.getElementById('add-message-container').style.display = 'flex'
                        document.getElementById('add-message').innerText = response.obj
                    } else {
                        showMessage(response.obj)
                        $scope.User = {};
                        $scope.GetUser();
                        $scope.ShowFormFlag = false;
                        $scope.hideAddForm();
                    }
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });

    }

    $scope.modifyUser = function (data) {
        $scope.showEditPopup();
        $scope.UserEdit = data;
        $scope.GetUser();
    }

    $scope.editUser = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/User/EditUser',
            data: $scope.UserEdit,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    document.getElementById('edit-message-container').style.display = 'flex'
                    document.getElementById('edit-message').innerText = response.obj
                }
                else {
                    if (response.obj == 'Bad Password') {
                        document.getElementById('edit-message-container').style.display = 'flex'
                        document.getElementById('edit-message').innerText = response.obj
                    } else {
                        showMessage(response.obj)
                        $scope.ShowEditFlag = false;
                        $scope.UserEdit = {};
                        $scope.GetUser();
                        $scope.ShowEditFlag = false;
                        $scope.hideEditForm()
                    }
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };


    $scope.deleteUser = function () {
        showLoadingScreen();
        console.log($scope.userDelete)
        $http({
            method: 'POST',
            url: 'api/User/DeleteUser',
            data: $scope.userDelete,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {

                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    $scope.resp = response.obj
                }
                else {
                    showMessage(response.obj);
                    $scope.resp = response.obj
                    $scope.GetUser();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $scope.resp = res.obj
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
        $scope.hideDeletePopup();
        $scope.User = {};
        $scope.GetUser()
    };

    $scope.showDeletePopup = function (data) {
        $scope.userDelete = data;
        $('.deletePopup').modal({
            context: '#parent-container'
        }).modal('show');
    }
    $scope.showAddPopup = function () {
        $('.addPopup').modal({
            context: '#parent-container',
            onHidden: function () {
                document.getElementById('add-message-container').style.display = 'none';
                document.getElementById('add-message').innerText = '';
            }
        }).modal('show');
    };
    $scope.hideAddForm = function () {
        $('.addPopup').modal('hide');
    };
    $scope.hideEditForm = function () {
        $('.editPopup').modal('hide');
    };
    $scope.showEditPopup = function () {
        $('.editPopup').modal({
            context: '#parent-container',
            onHidden: function () {
                document.getElementById('edit-message-container').style.display = 'none';
                document.getElementById('edit-message').innerText = '';
            }
        }).modal('show');
    };
    $scope.hideDeletePopup = function () {
        $('.deletePopup').modal('hide');
    };
});