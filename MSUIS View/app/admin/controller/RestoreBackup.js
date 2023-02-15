app.controller('RBCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $rootScope.pageTitle = "Backup Restore";
    $scope.DbList = {};
    $scope.a;

    $scope.blueprint = {
        "FrDbName": "",
        "ToDbName": "",
        "bkLocation": "0"
    }

    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.nwloc = function () {
        $scope.blueprint["bkLocation"] = '"' + document.getElementById('newloc').value.replace(/\\/g, '\\\\') + '"';
        $scope.getFiles();
    }
    $scope.defname = function () {
        document.getElementById('nwdbname').value = document.getElementById('frDbName').value;
    }
    $scope.getFiles = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/RB/RbFCGet',
            data: $scope.blueprint["bkLocation"],
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.FileList = {};
                }
                else {
                    $scope.FileList = response.obj
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
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
                    $scope.DatabaseList = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });

                    $scope.DbList = response.obj;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.setLocation = function (location) {
        if (location === '0') {
            $("#def").addClass("active").siblings().removeClass("active");
            document.getElementById('loc').style.display = 'none'
            $scope.blueprint["bkLocation"] = "0";
            $scope.getFiles();
            $scope.getDatabaseList();
        } else {
            $("#new").addClass("active").siblings().removeClass("active");
            document.getElementById('loc').style.display = 'flex';
            $scope.blueprint["bkLocation"] = location
        }
        $scope.blueprint["bkLocation"] = location
    }

    $scope.setRpflag = function (replaceFlag) {
        if (replaceFlag === '1') {
            $("#exist").addClass("active").siblings().removeClass("active");
            document.getElementById('nwdb').style.display = 'none'
            document.getElementById('existingdbnme').style.display = 'block'
        } else {
            $("#newdb").addClass("active").siblings().removeClass("active")
            document.getElementById('nwdb').style.display = 'block'
            document.getElementById('existingdbnme').style.display = 'none'
        }
        $scope.a = replaceFlag;
    }

    $scope.RestoreBackup = function () {
        $scope.blueprint["FrDbName"] = document.getElementById('frDbName').value,
        $scope.blueprint["bkLocation"] = document.getElementById('newloc').value
        if ($scope.a === '1') {
            $scope.blueprint["ToDbName"] = document.getElementById('toDbName').value;
        } else {
            $scope.blueprint["ToDbName"] = document.getElementById('nwdbname').value;
        }

        if (document.getElementById('frDbName').value == '? undefined:undefined ?') {
            showMessage('Please select database!')
            return
        }

        $scope.hideAddForm();
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/RB/RestoreBackup',
            data: $scope.blueprint,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    showMessage(response.obj);
                }
                else {
                    showMessage(response.obj);
                }
                $scope.getDatabaseList();
                hideLoadingScreen();
            })
            .error(function (res) {
                showMessage(res.obj);
                hideLoadingScreen();
            });
    };

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
});