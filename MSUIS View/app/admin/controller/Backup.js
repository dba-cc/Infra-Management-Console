app.controller('BackupCtrl', function ($scope, $http, $rootScope, NgTableParams) {
    $rootScope.pageTitle = "Schedule Backup";
    $('#chart-options').fadeOut();
    $scope.newSchedule = {
        "database": "",
        "location": "",
        "frequency": "DAILY",
        "type": "FULL",
        "time": "",
        "day": ""
    }

    $scope.a;
    $scope.blueprint = {
        "FrDbName": "",
        "ToDbName": "",
        "bkLocation": "0",
        "type": "0"
    }

    $scope.nwloc = function () {
        $scope.blueprint["bkLocation"] = document.getElementById('newloc').value;
        console.log($scope.blueprint["bkLocation"])
        console.log($scope.blueprint["type"])

        $scope.blueprint["bkLocation"] = document.getElementById('newloc').value.replace(/\\/g, '\\\\');
        $scope.getFiles();
        console.log($scope.blueprint["bkLocation"])

    }

    $scope.getFiles = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/RB/RbFCGet',
            data: '"' + $scope.blueprint["bkLocation"] + ' ' + $scope.blueprint["type"] + '"',
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

    $scope.setLocation = function (location) {
        if (location === '0') {
            $("#def").addClass("active").siblings().removeClass("active");
            document.getElementById('loc').style.display = 'none'
            document.getElementById('locnote').style.display = 'none';
            $scope.blueprint["bkLocation"] = "0";
            $scope.getFiles();
            $scope.getDatabaseList();
        } else {
            $("#new").addClass("active").siblings().removeClass("active");
            document.getElementById('loc').style.display = 'flex';
            document.getElementById('locnote').style.display = 'flex';
        }
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
    $scope.setextension = function (extensioneFlag) {
        if (extensioneFlag === '0') {
            $("#bak").addClass("active")
            $("#bacpac").removeClass("active");
            $scope.blueprint["type"] = "0";
            $scope.getFiles();

        } else {
            $("#bacpac").addClass("active")
            $("#bak").removeClass("active")
            $scope.blueprint["type"] = "1";
            $scope.getFiles();
        }
    }

    $scope.RestoreBackup = function () {
        $scope.blueprint["FrDbName"] = document.getElementById('frDbName').value
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
                console.log(response.obj)
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
                    $scope.jobs = response.obj.map(({ JobName }) => ({ JobName }));
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

    $scope.checkExistingJob = function (jobName) {
        for (var i = 0; i < $scope.jobs.length; i++) {
            if ($scope.jobs[i].JobName == jobName) {
                return true
            }
        }
        return false
    }

    $scope.deleteSchedule = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/AutoBackup/DeleteSchedule',
            data: '"'+$scope.scheduleDelete+'"',
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

        var jobName = $scope.newSchedule["frequency"].toLowerCase().charAt(0).toUpperCase() + $scope.newSchedule["frequency"].toLowerCase().slice(1) + ' ' + $scope.newSchedule["type"] + ' Backup - ' + $scope.newSchedule["database"];
        if ($scope.checkExistingJob(jobName) && document.getElementById('add-message-container').style.display == 'none') {
            document.getElementById('add-message-container').style.display = 'flex';
            document.getElementById('add-message').innerText = 'The schedule for this database already exists. Click again to overwrite it.';
            hideLoadingScreen()
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


    $scope.showAddPopup = function (type) {
        $('.addPopup.' + type).modal({
            context: '#parent-container',
            closable: false,
            onHidden: function () {
                document.getElementById('add-message-container').style.display = 'none';
                document.getElementById('add-message').innerText = '';
            }
        }).modal('show');
    };
    $scope.hideAddForm = function (type) {
        $('.addPopup.' + type).modal('hide');
    };
    $scope.showDeletePopup = function (schedule) {
        $scope.scheduleDelete = schedule;
        $('.deletePopup').modal({
            context: '#parent-container'
        }).modal('show');
    }
    $scope.hideDeletePopup = function () {
        $('.deletePopup').modal('hide');
    };
});