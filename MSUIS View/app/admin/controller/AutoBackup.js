app.controller('AutoBackupCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Schedule Backup";

    $scope.NewAddPage = function () {
        $scope.ShowFormFlag = true;
        $scope.ShowEditFlag = false;
    }

    var ProgrammeList = [];
    
    $scope.getDatabaseList = function () {

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

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.scheduleAutoBackup = function () {

        var eleFreq = document.getElementsByClassName('freqRadio');
        var eleType = document.getElementsByClassName('typeRadio');
        var selectedFreq, selectedType;
        for (i = 0; i < eleFreq.length; i++) {
            if (eleFreq[i].checked)
                selectedFreq = eleFreq[i].value;
        }
        for (i = 0; i < eleType.length; i++) {
            if (eleType[i].checked)
                selectedType = eleType[i].value;
        }

        var schedule = {
            "database": document.getElementById('Databasedropdown').value.split(':')[1],
            "location": document.getElementById('saveDir').value.replace(/\\\\/g, "\\"),
            "frequency": selectedFreq,
            "type": selectedType,
            "time": document.getElementById('timepicker').value + ':00',
            "day": document.getElementById('dayDropdown').value
        }
        console.log(schedule)

        $http({
            method: 'POST',
            url: 'api/AutoBackup/AutoBackupDatabase',
            data: schedule,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    //$scope.DatabaseList = {};
                }
                else {
                    //$scope.DatabaseList = response.obj;
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

});