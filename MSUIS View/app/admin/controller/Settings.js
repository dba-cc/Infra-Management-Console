app.controller('SettingsCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $rootScope.pageTitle = "Settings";
    $scope.showPassword = false;

    $scope.initfun = function () {
        $('#options').slideToggle()
        $scope.getTrigStatus();
        $scope.getlocr("rloc");
        $scope.getlocd("dloc");
        if (localStorage.getItem('theme') == 'dark') {
            document.getElementById('darkThemeRadio').checked = true
        }
        else if (localStorage.getItem('theme') == 'oceanblue') {
            document.getElementById('oceanBlueThemeRadio').checked = true
        }
        else if (localStorage.getItem('theme') == 'light') {
            document.getElementById('lightThemeRadio').checked = true
        }

    }

    $scope.checkIt = function () {
        if (!$scope.check) {
            $scope.check = true;
            $scope.setTrigToggle(1);
        } else {
            $scope.showAuth_DbPopup()
            $scope.check = false;
            $scope.setTrigToggle(0);
        }
    }

    $scope.authenticate_db = function () {
        var password = document.getElementById('db_password').value
        $http({
            method: 'POST',
            url: 'api/Settings/checklogin',
            data: '"' + 'Admin' + ' ' + password + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.logindetails = {};
                }
                else {

                    if (response.obj === "True") {
                        $scope.check = false;
                        document.getElementById('db_checkbox').checked = false;
                        $scope.hideAuth_DbForm();
                        $scope.setTrigToggle(0);
                    }
                    else {
                        $scope.check = true;
                        document.getElementById('db_checkbox').checked = true;
                        $scope.hideAuth_DbForm();
                        $scope.setTrigToggle(1);
                    }
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.showAuth_DbPopup = function () {
        $('.addDbPopup').modal({
            context: '#parent-container',
            closable: false,
            onHidden: function () {
                document.getElementById('db_password').value = '';
            }
        }).modal('show');
    };
    $scope.hideAuth_DbForm = function () {
        $('.addDbPopup').modal('hide');
    };

    $scope.showAuth_TablePopup = function () {
        $('.addTablePopup').modal({
            context: '#parent-container',
            closable: false,
            onHidden: function () {
                document.getElementById('tb_password').value = '';
            }
        }).modal('show');
    };
    $scope.hideAuth_TableForm = function () {
        $('.addTablePopup').modal('hide');
    };
    $scope.checkIt_table = function () {

        if (!$scope.check_table) {
            $scope.check_table = true;

        } else {
            $scope.showAuth_TablePopup();
            $scope.check_table = false;
        }
        console.log($scope.check_table)
    }
    $scope.authenticate_table = function () {
        if (document.getElementById('tb_password').value === 'abc@123') {
            $scope.check_table = false;
            document.getElementById('table_checkbox').checked = false;
            $scope.hideAuth_TableForm();
        }
        else {
            $scope.check_table = true;
            document.getElementById('table_checkbox').checked = true;
            $scope.hideAuth_TableForm();
        }
    }

    $scope.getTrigStatus = function () {
        showLoadingScreen();

        $http({
            method: 'POST',
            url: 'api/Settings/trigger_status',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.TrigStatus = {};
                }
                else {
                    $scope.TrigStatus = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                    $scope.check = response.obj;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();

            });
    };

    $scope.setTrigToggle = function (d) {
        showLoadingScreen();

        $http({
            method: 'POST',
            url: 'api/Settings/trigger_toggle',
            data: d,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.TrigToggle = {};
                }
                else {
                    $scope.TrigToggle = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.getlocr = function (data) {

        $http({
            method: 'POST',
            url: 'api/Settings/default_loc',
            data: {
                "typ": data
            },
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.rloc = {};
                }
                else {
                    $scope.rloc = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                    document.getElementById('rloc').value = response.obj;
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };
    $scope.getlocd = function (data) {

        $http({
            method: 'POST',
            url: 'api/Settings/default_loc',
            data: {
                "typ": data
            },
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.rloc = {};
                }
                else {
                    $scope.rloc = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                    document.getElementById('dloc').value = response.obj;
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };
    $scope.submit = function () {
        var r = document.getElementById('rloc').value;
        var d = document.getElementById('dloc').value;
        $scope.updateloc(r, 'rloc')
        $scope.updateloc(d, 'dloc')
        console.log(r);
        console.log(d);
    }
    $scope.updateloc = function (loc, type) {
        console.log(loc)
        console.log(type)
        $http({
            method: 'POST',
            url: 'api/Settings/update_loc',
            data: {
                "loc": loc,
                "typ": type
            },
            headers: { "Content-Type": 'application/json' }

        })

            .success(function (response) {
                if (response.response_code == "201") {
                    showMessage(response.obj);
                }
                else {
                    showMessage(response.obj);
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };
});