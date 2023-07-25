app.controller('BackupCtrl', function ($scope, $http, NgTableParams) {
    
    /*Auto Backup*/

    $scope.newSchedule = {
        "database": "",
        "location": "",
        "frequency": "DAILY",
        "type": "FULL",
        "time": "",
        "day": ""
    }

    // Get Backup Schedules
    $scope.getBackupSchedules = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/AutoBackup/GetBackupSchedules',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    showMessage(response.obj);
                } else {
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
                alert("Error: " + res.obj);
                hideLoadingScreen();
            });
        $scope.GetAutoBackupLogs()
    };

    // Get logs of auto backup
    $scope.GetAutoBackupLogs = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/AutoBackup/GetAutoBackupLogs',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    showMessage(response.obj);
                } else {
                    $scope.LogParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                alert("Error: " + res.obj);
                hideLoadingScreen();
            });
    };

    // Delete Schedule
    $scope.deleteSchedule = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/AutoBackup/DeleteSchedule',
            data: '"' + $scope.scheduleDelete + '"',
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
                alert("Error: " + res.obj);
                hideLoadingScreen();
            });
    };

    // Schedule new backup
    $scope.scheduleAutoBackup = function () {
        showLoadingScreen();

        // Validations
        // Check if day of week is selected
        if (document.getElementById('daySelect').value === '? undefined:undefined ?' && $scope.newSchedule["frequency"] === 'WEEKLY') {
            showMessage('Please select day of the week!')
            return
        }

        // Check if database is selected
        if (document.getElementById('dbSelect').value === '? undefined:undefined ?') {
            showMessage('Please select database!')
            return
        }

        // Check if directory selected.
        if (document.getElementById('saveDir').value === '') {
            showMessage('Please enter directory!')
            return
        }

        // Check for duplicate schedule
        var jobName = $scope.newSchedule["frequency"].toLowerCase().charAt(0).toUpperCase() + $scope.newSchedule["frequency"].toLowerCase().slice(1) + ' ' + $scope.newSchedule["type"] + ' Backup - ' + $scope.newSchedule["database"];
        if ($scope.checkExistingJob(jobName) && document.getElementById('add-message-container-autobackup').style.display == 'none') {
            document.getElementById('add-message-container-autobackup').style.display = 'flex';
            document.getElementById('add-message-autobackup').innerText = 'The schedule for this database already exists. Click again to overwrite it.';
            hideLoadingScreen()
            return
        }

        // Setting parameters to schedule object
        $scope.newSchedule["database"] = document.getElementById('dbSelect').value
        $scope.newSchedule["location"] = document.getElementById('saveDir').value
        $scope.newSchedule["time"] = document.getElementById('timepicker').value + ':00'
        if ($scope.newSchedule["frequency"] === 'WEEKLY') {
            $scope.newSchedule["day"] = document.getElementById('daySelect').value
        } else {
            $scope.newSchedule["day"] = ""
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
                    $scope.hidePopup('autobackup');
                    $scope.getBackupSchedules();
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                alert("Error: " + res.obj);
                hideLoadingScreen();
            });
    };

    // Verify existing schedule name
    $scope.checkExistingJob = function (jobName) {
        for (var i = 0; i < $scope.jobs.length; i++) {
            if ($scope.jobs[i].JobName == jobName) {
                return true
            }
        }
        return false
    }


    /*Restore Backup*/

    $scope.restoreBackupInfo = {
        "FrDbName": "",
        "ToDbName": "",
        "bkLocation": "0",
        "extension": false // .bak file
    }

    // Get files from selected location
    $scope.getFiles = function () {
        showLoadingScreen();

        // Removing double slashes from directory
        if ($scope.restoreBackupInfo["bkLocation"] !== "0") {
            $scope.restoreBackupInfo["bkLocation"] = document.getElementById('newloc').value.replace(/\\/g, '\\\\');
        }

        $http({
            method: 'POST',
            url: 'api/RestoreBackup/GetBackupFilesFromDirectory',
            data: '"' + $scope.restoreBackupInfo["bkLocation"] + '|' + $scope.restoreBackupInfo["extension"] + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.FileList = {};
                } else {
                    $scope.FileList = response.obj
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                alert("Error: " + res.obj);
                hideLoadingScreen();
            });
    };

    // Get all Databases from server
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
                alert("Error: " + res.obj);
                hideLoadingScreen();
            });
    };

    // Restore backup
    $scope.RestoreBackup = function () {
        $scope.restoreBackupInfo["FrDbName"] = document.getElementById('frDbName').value

        // Validations
        // check if destination DB is new or existing
        if ($scope.replaceFlag) {
            $scope.restoreBackupInfo["ToDbName"] = document.getElementById('toDbName').value;
        } else {
            $scope.restoreBackupInfo["ToDbName"] = document.getElementById('newdbname').value;
        }

        // check if source database file is selected
        if (document.getElementById('frDbName').value == '? undefined:undefined ?') {
            showMessage('Please select database!')
            return
        }

        // If DB file location is not default then assign new location
        if ($scope.restoreBackupInfo["bkLocation"] !== "0") {
            $scope.restoreBackupInfo["bkLocation"] = document.getElementById('newloc').value;
        }

        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/RestoreBackup/RestoreBackup',
            data: $scope.restoreBackupInfo,
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
                alert("Error: " + res.obj);
                hideLoadingScreen();
            });
    };


    /*UI Functions*/

    $('#log-options').fadeOut();
    $scope.showLog = false;

    // Triggers on Database location selection and changes UI accordingly
    $scope.isNewLocation = function (newLocation) {
        if (!newLocation) {
            // Default location
            $("#def").addClass("active").siblings().removeClass("active");
            document.getElementById('loc').style.display = 'none'
            document.getElementById('locnote').style.display = 'none';
            $scope.restoreBackupInfo["bkLocation"] = "0";
            $scope.getFiles();
            $scope.getDatabaseList();
        } else {
            // New Location
            $("#new").addClass("active").siblings().removeClass("active");
            document.getElementById('loc').style.display = 'flex';
            $scope.restoreBackupInfo["bkLocation"] = "1";
            document.getElementById('locnote').style.display = 'flex';
        }
    }

    // Sets destination database flag for existing or new
    $scope.setExistingDBFlag = function (flag) {
        if (flag) {
            // Existing Database
            $("#exist").addClass("active").siblings().removeClass("active");
            document.getElementById('nwdb').style.display = 'none'
            document.getElementById('existingdbnme').style.display = 'block'
        } else {
            // New Database
            $("#newdb").addClass("active").siblings().removeClass("active")
            document.getElementById('nwdb').style.display = 'block'
            document.getElementById('existingdbnme').style.display = 'none'
        }
        $scope.replaceFlag = flag;
    }

    // Sets file extension (.bak / .bacpac)
    $scope.setExtension = function (flag) {
        if (!flag) {
            //.bak file
            $("#bak").addClass("active")
            $("#bacpac").removeClass("active");
            $scope.restoreBackupInfo["extension"] = false;
            $scope.getFiles();
        } else {
            //.bacpac file
            $("#bacpac").addClass("active")
            $("#bak").removeClass("active")
            $scope.restoreBackupInfo["extension"] = true;
            $scope.getFiles();
        }
    }

    // Function to show dropdown options
    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    // Sets auto backup frequency (Daily / Weekly)
    $scope.setFrequency = function (frequency) {
        if (frequency === 'daily') {
            // Daily
            $("#daily").addClass("active").siblings().removeClass("active");
            document.getElementById('dayDropdown').style.display = 'none'
        } else {
            // Weekly
            $("#weekly").addClass("active").siblings().removeClass("active");
            document.getElementById('dayDropdown').style.display = 'block'
        }
        $scope.newSchedule["frequency"] = frequency.toUpperCase()
    }

    // Sets backup type (Full / Partial)
    $scope.setBackupType = function (type) {
        if (type === 'full') {
            // Full
            $("#full").addClass("active").siblings().removeClass("active");
        } else {
            // Partial
            $("#partial").addClass("active").siblings().removeClass("active")
        }
        $scope.newSchedule["type"] = type.toUpperCase()
    }

    // Show auto backup logs
    $scope.changeView = function () {
        $scope.showLog = !$scope.showLog
        document.getElementsByClassName('bottom-container-item')[0].style.height = 'auto'
        if (!$scope.showLog) {
            document.getElementById('log-parent').style.padding = 0;
            $('#log-parent').animate({
                height: "50px"
            });
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '76vh';
            document.getElementById('table-container').style.padding = '0 1rem';
            $('#log-options').fadeOut();
        } else {
            document.getElementById('log-parent').style.padding = '15px';
            $('#log-parent').animate({
                height: "84vh"
            });
            document.getElementById('table-container').style.padding = '40px 40px';
            $('#log-options').fadeIn();
        }
    }

    // Show Popup (Schedule new backup / Restore Database)
    $scope.showPopup = function (type) {
        $('.addPopup.' + type).modal({
            context: '#parent-container',
            closable: false,
            onHidden: function () {
                document.getElementById('add-message-container').style.display = 'none';
                document.getElementById('add-message').innerText = '';
            }
        }).modal('show');
    };

    // Hide Popup (Schedule new backup / Restore Database)
    $scope.hidePopup = function (type) {
        $('.addPopup.' + type).modal('hide');
    };

    // Show Delete Popup
    $scope.showDeletePopup = function (schedule) {
        $scope.scheduleDelete = schedule;
        $('.deletePopup').modal({
            context: '#parent-container'
        }).modal('show');
    }

    // Hide Delete Popup
    $scope.hideDeletePopup = function () {
        $('.deletePopup').modal('hide');
    };
});