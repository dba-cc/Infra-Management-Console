app.controller('SettingsCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $rootScope.pageTitle = "Settings";
    //$scope.all = false;
   
    $scope.initfun = function () {
        $scope.toggleDefaultLocations();
        $scope.getTrigStatus();
        $scope.check_table = true;
        $scope.getlocr("rloc");
        $scope.getlocd("dloc");        
        if (localStorage.getItem('theme') == 'dark') {
            document.getElementById('darkthemeCheckbox').checked = true
        }
        else if (localStorage.getItem('theme') == 'blue') {
            document.getElementById('oceanthemeCheckbox').checked = true
        } else if (localStorage.getItem('theme') == 'light') {
            document.getElementById('somethemeCheckbox').checked = true
        }
        
    }
    $scope.toggleDefaultLocations = function () {
        $('#options').slideToggle()
    }

    $scope.checkIt = function () {
        if (!$scope.check) {
            $scope.check = true;
            $('#freq').fadeIn();
            $scope.setTrigToggle(1);
        } else {
            $scope.check = false;
            $scope.setTrigToggle(0);
        }
    }
    $scope.authenticate = function () {
        if (document.getElementById('password').value === 'abc@123') {
            $scope.check_table = false;
            document.getElementById('table_checkbox').checked = false;
            $scope.hideAuthForm();
        }
        else {
            $scope.check_table = true;
            document.getElementById('table_checkbox').checked = true;
            $scope.hideAuthForm();
        }
    }
    $scope.showAuthPopup = function () {
        $('.addPopup').modal({
            context: '#parent-container',
            onHidden: function () {
                //document.getElementById('add-message-container').style.display = 'none';
                document.getElementById('password').value = '';
            }
        }).modal('show');
    };
    $scope.hideAuthForm = function () {
        $('.addPopup').modal('hide');
    };
    $scope.checkIt_table = function () {
        
        if (!$scope.check_table) {
            $scope.check_table = true;
            $('#freq').fadeIn();
            
        } else {
            $scope.showAuthPopup()
            $scope.check_table = false;
           
        }
        
        console.log($scope.check_table)
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
                    console.log(response.obj);
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

                    //console.log(response.obj);
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
                    //$scope.somevalue_r = response.obj;
                    document.getElementById('rloc').value = response.obj;
                    //console.log(response.obj);
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
                    //$scope.somevalue_r = response.obj;
                    document.getElementById('dloc').value = response.obj;
                    //console.log(response.obj);
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
    $scope.updateloc = function (loc,type) {
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