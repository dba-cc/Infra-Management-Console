app.controller('UserCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "User Management";

    $scope.dropdownLoginType = function () {
        $('#ltDropdown').dropdown();
    }

    $scope.dropdownLogin = function () {
        $('#loginDropdown').dropdown();
    }

    $scope.dropdownDB = function () {
        $('#dbDrop').dropdown();
    }

    $scope.options = [
        { name: 'New Login' },
        { name: 'Existing Login' },
        { name: 'Without Login' }
    ];

    $scope.selectedOption = $scope.options[0];


    $scope.showUserTableflag = false;
    $scope.NewLoginFlag = false;
    $scope.ExistingLoginFlag = false;

    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }

    $scope.showPassword = false;
    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    };

    $scope.changeLoginFlag = function () {
        if ($scope.selectedOption == 'New Login') {
            $scope.ExistingLoginFlag = false;
            $scope.NewLoginFlag = true;
        } else if ($scope.selectedOption == 'Existing Login') {
            $scope.getLoginList();
            $scope.NewLoginFlag = false;
            $scope.ExistingLoginFlag = true;
        } else {
            $scope.NewLoginFlag = false;
            $scope.ExistingLoginFlag = false;
        }
    };

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

    $scope.getLoginList = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Login/GetLogin',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.LoginList = {};
                }
                else {
                    $scope.LoginList = response.obj;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.GetUser = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/User/GetSystemUsersDB',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.showUserTableflag = true;
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
        if ($scope.selectedOption == 'New Login') {
            if ($scope.LoginName === '' || $scope.LoginName === undefined || $scope.LoginName === null || $scope.Password === '' || $scope.Password === undefined || $scope.Password === null) {
                document.getElementById('add-message-container').style.display = 'flex'
                document.getElementById('add-message').innerText = 'LoginName or Password are required!'
                hideLoadingScreen();
            } else {
                if ($scope.UserName === '' || $scope.UserName === undefined || $scope.UserName === null) {
                    document.getElementById('add-message-container').style.display = 'flex'
                    document.getElementById('add-message').innerText = 'Username is required!'
                    hideLoadingScreen();
                } else {
                    $http({
                        method: 'POST',
                        url: 'api/User/CreateUserForNewLogin',
                        data: '"' + $scope.UserName + ' ' + $scope.DB.name + ' ' + $scope.LoginName + ' ' + $scope.Password + '"',
                        headers: { "Content-Type": 'application/json' }
                    })
                        .success(function (response) {
                            if (response.response_code != "200") {
                                $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                            }
                            else {
                                if (response.obj == 'Password length must be 8 or more!' || response.obj == 'Password must contain punctuation characters!' || response.obj == 'Password must contain alphanumeric characters!' || response.obj == 'Login Already Exists!') {
                                    document.getElementById('add-message-container').style.display = 'flex'
                                    document.getElementById('add-message').innerText = response.obj
                                } else {
                                    showMessage(response.obj)
                                    //$scope.User = {};
                                    //$scope.GetUser();
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
            }
        } else if ($scope.selectedOption == 'Existing Login') {
            if ($scope.UserName === '' || $scope.UserName === undefined || $scope.UserName === null) {
                document.getElementById('add-message-container').style.display = 'flex'
                document.getElementById('add-message').innerText = 'Username is required!'
                hideLoadingScreen();
            } else {
                if ($scope.Login === '' || $scope.Login === undefined || $scope.Login === null) {
                    document.getElementById('add-message-container').style.display = 'flex'
                    document.getElementById('add-message').innerText = 'Select Login!'
                    hideLoadingScreen();
                } else {
                    $http({
                        method: 'POST',
                        url: 'api/User/CreateUserForExistingLogin',
                        data: '"' + $scope.UserName + ' ' + $scope.DB.name + ' ' + $scope.Login.name + '"',
                        headers: { "Content-Type": 'application/json' }
                    })
                        .success(function (response) {
                            if (response.response_code != "200") {
                                $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                            }
                            else {
                                if (response.obj == 'User for selected login already exists in this DB!') {
                                    document.getElementById('add-message-container').style.display = 'flex'
                                    document.getElementById('add-message').innerText = response.obj
                                } else {
                                    showMessage(response.obj)
                                    //$scope.User = {};
                                    //$scope.GetUser();
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
            }
        } else {
            if ($scope.UserName === '' || $scope.UserName === undefined || $scope.UserName === null) {
                document.getElementById('add-message-container').style.display = 'flex'
                document.getElementById('add-message').innerText = 'Username is required!'
                hideLoadingScreen();
            } else {
                $http({
                    method: 'POST',
                    url: 'api/User/CreateUserWithoutLogin',
                    data: '"' + $scope.UserName + ' ' + $scope.DB.name + '"',
                    headers: { "Content-Type": 'application/json' }
                })
                    .success(function (response) {
                        if (response.response_code != "200") {
                            $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                        }
                        else {
                            if (response.obj == 'User Already Exists!') {
                                document.getElementById('add-message-container').style.display = 'flex'
                                document.getElementById('add-message').innerText = response.obj
                            } else {
                                showMessage(response.obj)
                                //$scope.User = {};
                                //$scope.GetUser();
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
        }
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
        $http({
            method: 'POST',
            url: 'api/User/DeleteUser',
            data: '"' + $scope.userDelete.UserName + ' ' + $scope.Database.name + '"' ,
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