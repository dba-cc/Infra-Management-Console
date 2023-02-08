app.controller('RBCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Backup Restore";


    $scope.blueprint = {
        "FrDbName": "",
        "ToDbName": "",
        "bkLocation": "0"

    }


    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.nwloc = function () {
        $scope.blueprint["bkLocation"] = '"' + document.getElementById('newloc').value + '"';
        console.log($scope.blueprint["bkLocation"])
        $scope.getFiles();
    }
    /*   $scope.nwnme = function () {
           $scope.blueprint["ToDbName"] = document.getElementById('nwdb').value;
           console.log($scope.blueprint["ToDbName"])
           $scope.getFiles();
       }*/


    $scope.getFiles = function () {
        showLoadingScreen();
        console.log($scope.blueprint["bkLocation"])
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
                    console.log($scope.FileList)
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });


    };
    $scope.DbList = {};
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
                    }, {
                        dataset: response.obj
                    });
                    console.log(response.obj)
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
            document.getElementById('loc').style.display = 'block';
            console.log($scope.location)
            $scope.blueprint["bkLocation"] = location
        }
        $scope.blueprint["bkLocation"] = location

    }
    $scope.a;
    $scope.setRpflag = function (replaceFlag) {
        if (replaceFlag === '1') {
            $("#exist").addClass("active").siblings().removeClass("active");
            document.getElementById('nwdb').style.display = 'none'
            document.getElementById('existingdbnme').style.display = 'block'
            a = replaceFlag;

        } else {
            $("#newdb").addClass("active").siblings().removeClass("active")
            document.getElementById('nwdb').style.display = 'block'
            document.getElementById('existingdbnme').style.display = 'none'
        }
    }

    $scope.RestoreBackup = function () {
        showLoadingScreen();
        $scope.blueprint["FrDbName"] = document.getElementById('frDbName').value,
            $scope.blueprint["bkLocation"] = document.getElementById('newloc').value
        if (a === '1') {
            $scope.blueprint["ToDbName"] = document.getElementById('toDbName').value;
        } else {
            $scope.blueprint["ToDbName"] = document.getElementById('nwdb').value;
        }


        if (document.getElementById('frDbName').value == '? undefined:undefined ?') {
            showMessage('Please select database!')
            return
        }
        /* if (replaceFlag === '1') {
             $scope.blueprint["ToDbName"] = document.getElementById('toDbName').value
 
         }
         else if (replaceFlag === '0') {
             $scope.blueprint["ToDbName"] = document.getElementById('nwnm').value
 
         }*/


        console.log($scope.blueprint["FrDbName"])
        console.log($scope.blueprint["ToDbName"])
        console.log($scope.blueprint["bkLocation"])

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