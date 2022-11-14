app.controller('CredentialAnalyticsCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval) {
   
    $scope.GetCredentialAnalytics = function () {

            $http({
                method: 'POST',
                url: 'api/Analytics/GetCredentialAnalysis',
                headers: { "Content-Type": 'application/json' }
            })

                .success(function (response) {
                    if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    }
                    else {
                        $scope.CredentialParams = new NgTableParams({
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