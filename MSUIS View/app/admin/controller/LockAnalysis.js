app.controller('LockAnalysisCtrl', function ($scope, $interval, $http, $rootScope, NgTableParams) {


    $scope.o = false;
    $scope.checkIt = function () {
        if (!$scope.check) {
            $scope.check = true;
            $('#freq').fadeIn();

            $scope.o = true;
        } else {
            $scope.check = false;
            $('#freq').fadeOut();
            $scope.o = false;
            $interval.cancel($scope.p);
            $interval.cancel($scope.c);
            document.getElementById('placeholder').innerText = 'Auto Refresh Freq'
            /*$scope.item = "";*/
        }
        console.log($scope.check)
    }
    $scope.refreq = function () {
        $interval.cancel($scope.c);
        $interval.cancel($scope.p);
        //clearInterval($scope.p);
        // $scope.temp;        
        if ($scope.o == true) { // check if auto refresh is on or off
            $scope.tep($scope.temp);
            $scope.p = $interval(function () {
                $interval.cancel($scope.c);
                console.log($scope.temp)
                $scope.GetLocksAnalysis();

                $scope.tep($scope.temp)
                $scope.filterQueries();
            }, $scope.temp);
        }
    }

    $scope.tep = function (b) {
        var a = (b / 1000);
        /* var minutes = Math.floor(a / 60);
         var seconds = a % 60; 
         console.log( minutes +' : '+ seconds )*/
        $scope.c = $interval(function () {
            document.getElementById('placeholder').innerText = ' ' + --a + ' sec';
            /* document.getElementById('placeholder').innerText = ' ' + minutes + ' : ' + --seconds + ' sec';*/
        }, 1000);
    }

    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }


    $scope.GetLocksAnalysis = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/LockAnalysis/GetLock',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.LockParams = new NgTableParams({
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

    $scope.LockMaker = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/LockAnalysis/LockMaker',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
        $scope.GetLocksAnalysis();
    };

    $scope.showKillPopup = function (data) {
        $scope.killSession = data;
        $('.deletePopup').modal({
            context: '#parent-container'
        }).modal('show');
    }

    $scope.hideKillPopup = function () {
        $('.deletePopup').modal('hide');
    };

    $scope.killLock = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/LockAnalysis/KillSession',
            data: $scope.killSession,
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
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $scope.resp = res.obj
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
        $scope.hideKillPopup();
        setTimeout($scope.GetLocksAnalysis() , 1000);
        $scope.GetLocksAnalysis();
    };
});