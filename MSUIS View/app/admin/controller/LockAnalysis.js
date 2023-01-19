app.controller('LockAnalysisCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval) {

    $scope.GetLocksAnalysis = function () {

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
                    }, {
                        dataset: response.obj
                    });
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
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
        console.log($scope.killSession)
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
            })
            .error(function (res) {
                $scope.resp = res.obj
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
        $scope.hideKillPopup();
        $scope.GetLocksAnalysis();

    };

});

