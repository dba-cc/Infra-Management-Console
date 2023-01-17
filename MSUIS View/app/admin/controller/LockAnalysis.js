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

});