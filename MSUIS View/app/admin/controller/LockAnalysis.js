app.controller('LockAnalysisCtrl', function ($scope, $http, $rootScope, NgTableParams) {
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
                    $scope.GetUser();
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