app.controller('UserCtrl', function ($scope, $http, $rootScope, NgTableParams) {
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

    $scope.options2 = [
        { name: 'Logins' },
        { name: 'Users' },
    ];

    $scope.selectedOption = $scope.options[0];
    $scope.selectedOption2 = $scope.options2[0];

    $scope.dropdownshowUsers = function () {
        $('#suDropdown').dropdown();
    }

    $scope.changeFlags = function () {
        if ($scope.selectedOption2 == 'Logins') {
            $scope.ShowLogin = true;
            $scope.showSystemLogin = true;
            $scope.showSystemUser = false;
            $scope.ShowUser = false;
            $scope.showLoginList();
            $scope.showUserTableflag = false;
        } else {
            $scope.ShowLogin = false;
            $scope.ShowUser = true
            $scope.showSystemLogin = false;
        }
    };


    $scope.ShowLogin = false;
    $scope.ShowUser = false;
    $scope.showUserTableflag = false;
    $scope.NewLoginFlag = false;
    $scope.ExistingLoginFlag = false;
    $scope.showSystemLogin = false;
    $scope.showSystemUser = false;

    $scope.checkLogin = false;
    $scope.checkUser = false;

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

    $scope.CheckLogin = function () {
        if ($scope.checkLogin) {
            $scope.checkLogin = false;
        } else {
            $scope.checkLogin = true;
        }
        $scope.showLoginList();
    };

    $scope.showLoginList = function () {
        showLoadingScreen();
        var api = '';
        if ($scope.checkLogin) {
            api = 'api/Login/ShowSystemLogin';
        } else {
            api = 'api/Login/ShowLogin';
        }
        $http({
            method: 'POST',
            url: api,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.showLoginTableflag = true;
                    $scope.LoginParams = new NgTableParams({
                        count: response.obj.length
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
    };

    $scope.CheckUser = function () {
        if ($scope.checkUser) {
            $scope.checkUser = false;
        } else {
            $scope.checkUser = true;
        }
        $scope.GetUser();
    };

    $scope.GetUser = function () {
        showLoadingScreen();
        $scope.showSystemUser = true;
        var api = '';
        if ($scope.checkUser) {
            api = 'api/User/ShowSystemUsers';
        } else {
            api = 'api/User/GetSystemUsersDB';
        }
        $http({
            method: 'POST',
            url: api,
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
                        count: response.obj.length
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


    $scope.AddLogin = function () {
        if ($scope.Login.LoginName === '' || $scope.Login.LoginName === undefined || $scope.Login.LoginName === null || $scope.Login.LoginPassword === '' || $scope.Login.LoginPassword === undefined || $scope.Login.LoginPassword === null) {
            document.getElementById('add-message-container-login').style.display = 'flex'
            document.getElementById('add-message-login').innerText = 'LoginName or Password are required!'
        } else {
            showLoadingScreen();
                $http({
                    method: 'POST',
                    url: 'api/Login/CreateLogin',
                    data: '"' + $scope.Login.LoginName + ' ' + $scope.Login.LoginPassword + '"',
                    headers: { "Content-Type": 'application/json' }
                })
                    .success(function (response) {
                        if (response.response_code != "200") {
                            $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                        }
                        else {
                            if (response.obj == 'Password length must be 8 or more!' || response.obj == 'Password must contain punctuation characters!' || response.obj == 'Password must contain alphanumeric characters!' || response.obj == 'Login Already Exists!') {
                                document.getElementById('add-message-container-login').style.display = 'flex'
                                document.getElementById('add-message-login').innerText = response.obj
                            } else {
                                showMessage(response.obj)
                                $scope.ShowFormFlag = false;
                                $scope.hideAddLoginForm();
                                $scope.showLoginList();
                            }
                        }
                        hideLoadingScreen();
                    })
                    .error(function (res) {
                        $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                        hideLoadingScreen();
                    });
            }
    };


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
                    //var login = $scope.Login.name;
                    //login = login.replace(/\\/g, "\\\\");
                    //$console.log(login);
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
                    $scope.showLoginList();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $scope.resp = res.obj
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
        $scope.hideDeleteLoginPopup();
        $scope.User = {};
        $scope.GetUser()
    };


    $scope.modifyLogin = function (data) {
        $scope.showEditLoginPopup();
        $scope.LoginEdit = data;
        //$scope.GetUser();
    }
    $scope.editLogin = function () {
        if ($scope.LoginEdit.password === '' || $scope.LoginEdit.password === undefined || $scope.LoginEdit.password === null) {
            document.getElementById('edit-message-container-login').style.display = 'flex'
            document.getElementById('edit-message-login').innerText = 'Password is required!'
        } else {
            showLoadingScreen();
            $http({
                method: 'POST',
                url: 'api/Login/EditLogin',
                data: '"' + $scope.LoginEdit.name + ' ' + $scope.LoginEdit.password + '"',
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {
                    if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    }
                    else {
                        if (response.obj == 'Password length must be 8 or more!' || response.obj == 'Password must contain punctuation characters!' || response.obj == 'Password must contain alphanumeric characters!' || response.obj == 'Login does not Exists!') {
                            document.getElementById('edit-message-container-login').style.display = 'flex'
                            document.getElementById('edit-message-login').innerText = response.obj
                        } else {
                            showMessage(response.obj)
                            //$scope.ShowFormFlag = false;
                            $scope.hideEditLoginForm();
                            $scope.LoginEdit = {}
                        }
                    }
                    hideLoadingScreen();
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                    hideLoadingScreen();
                });
        }
        
    };

    $scope.deleteLogin = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Login/DeleteLogin',
            data: '"' + $scope.loginDelete.name + '"',
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
                    $scope.showLoginList();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
        $scope.hideDeleteLoginPopup();
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



    $scope.showAddLoginPopup = function () {
        $('.addLoginPopup').modal({
            context: '#parent-container',
            onHidden: function () {
                document.getElementById('add-message-container-login').style.display = 'none';
                document.getElementById('add-message-login').innerText = '';
            }
        }).modal('show');
    };

    $scope.hideAddLoginForm = function () {
        $('.addLoginPopup').modal('hide');
    };

    $scope.showEditLoginPopup = function () {
        $('.editloginPopup').modal({
            context: '#parent-container',
            onHidden: function () {
                document.getElementById('edit-message-container-login').style.display = 'none';
                document.getElementById('edit-message-login').innerText = '';
            }
        }).modal('show');
    };

    $scope.hideEditLoginForm = function () {
        $('.editloginPopup').modal('hide');
    };

    $scope.showDeleteLoginPopup = function (data) {
        $scope.loginDelete = data;
        $('.deleteloginPopup').modal({
            context: '#parent-container'
        }).modal('show');
    };

    $scope.hideDeleteLoginPopup = function () {
        $('.deleteloginPopup').modal('hide');
    };
});