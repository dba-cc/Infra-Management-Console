app.controller('AutoBackupCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $rootScope.pageTitle = "Schedule Backup";

    $scope.newSchedule = {
        "database": "",
        "location": "",
        "frequency": "DAILY",
        "type": "FULL",
        "time": "",
        "day": ""
    }

    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.setFrequency = function (frequency) {
        if (frequency === 'daily') {
            $("#daily").addClass("active").siblings().removeClass("active");
            document.getElementById('dayDropdown').style.display = 'none'
        } else {
            $("#weekly").addClass("active").siblings().removeClass("active");
            document.getElementById('dayDropdown').style.display = 'block'
        }
        $scope.newSchedule["frequency"] = frequency.toUpperCase()
    }

    $scope.setType = function (type) {
        if (type === 'full') {
            $("#full").addClass("active").siblings().removeClass("active");
        } else {
            $("#partial").addClass("active").siblings().removeClass("active")
        }
        $scope.newSchedule["type"] = type.toUpperCase()
    }

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

    $scope.getBackupSchedules = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/AutoBackup/GetBackupSchedules',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.ScheduleParams = new NgTableParams({
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
        $scope.GetAutoBackupLogs()
    };

    $scope.GetAutoBackupLogs = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/AutoBackup/GetAutoBackupLogs',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.LogParams = new NgTableParams({
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

    $scope.deleteSchedule = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/AutoBackup/DeleteSchedule',
            data: $scope.scheduleDelete,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    showMessage(response.obj);
                }
                else {
                    showMessage(response.obj);
                    $scope.hideDeletePopup();
                    $scope.getBackupSchedules();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.scheduleAutoBackup = function () {
        showLoadingScreen();
        $scope.newSchedule["database"] = document.getElementById('dbSelect').value
        $scope.newSchedule["location"] = document.getElementById('saveDir').value
        $scope.newSchedule["time"] = document.getElementById('timepicker').value + ':00'
        if ($scope.newSchedule["frequency"] === 'WEEKLY') {
            $scope.newSchedule["day"] = document.getElementById('daySelect').value
        } else {
            $scope.newSchedule["day"] = ""
        }

        if (document.getElementById('daySelect').value === '? undefined:undefined ?' && $scope.newSchedule["frequency"] === 'WEEKLY') {
            showMessage('Please select day of the week!')
            return
        }

        if (document.getElementById('dbSelect').value === '? undefined:undefined ?') {
            showMessage('Please select database!')
            return
        }

        if (document.getElementById('saveDir').value === '') {
            showMessage('Please enter directory!')
            return
        }

        $http({
            method: 'POST',
            url: 'api/AutoBackup/AutoBackupDatabase',
            data: $scope.newSchedule,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    showMessage(response.obj);
                }
                else {
                    showMessage(response.obj);
                    $scope.hideAddForm();
                    $scope.getBackupSchedules();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.showLog = false;
    $scope.changeView = function () {
        $scope.showLog = !$scope.showLog
        console.log($scope.showLog)
        document.getElementsByClassName('chart-item')[0].style.height = 'auto'
        if (!$scope.showLog) {
            document.getElementById('chart-parent').style.padding = 0;
            $('#chart-parent').animate({
                height: "50px"
            });
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '76vh';
            document.getElementById('table-container').style.padding = '0 1rem';
            $('#chart-options').fadeOut();
        } else {
            document.getElementById('chart-parent').style.padding = '15px';
            $('#chart-parent').animate({
                height: "84vh"
            });
            document.getElementById('table-container').style.padding = '40px 40px';
            $('#chart-options').fadeIn();
        }
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
    $scope.showDeletePopup = function (schedule) {
        $scope.scheduleDelete = {
            database: schedule.DB,
            frequency: schedule.Frequency,
            type: schedule.BackupType.trim()
        };
        $('.deletePopup').modal({
            context: '#parent-container'
        }).modal('show');
    }
    $scope.hideDeletePopup = function () {
        $('.deletePopup').modal('hide');
    };
});