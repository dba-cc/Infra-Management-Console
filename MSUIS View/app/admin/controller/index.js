app.controller('IndexCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog) {

    $cookies.remove("id");

    $rootScope.showLoading = false;

    $scope.myFunct = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.login();
    }


    $scope.loginObj = {};

    $scope.login = function () {

        $rootScope.showLoading = false;

        if ($scope.loginObj.username === null || $scope.loginObj.username === undefined || $scope.loginObj.username === "" || $scope.loginObj.password === undefined || $scope.loginObj.password === null || $scope.loginObj.password === "") {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title("Error")
                    .textContent("Please enter username and password...")
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
            );
        }
        else {
            $scope.loginData = {};
            $scope.loginData.username = $scope.loginObj.username + "@msubaroda.ac.in";
            $scope.loginData.password = $scope.loginObj.password;

            $http({
                method: 'POST',
                url: 'api/admin/login',
                data: $scope.loginData,
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {
                    $rootScope.showLoading = false;

                    if (response.response_code != "200") {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title("Error")
                                .textContent(response.obj)
                                .ariaLabel('Alert Dialog Demo')
                                .ok('Got it!')
                        );
                    }
                    else {

                        $rootScope.id = response.obj.id;
                        $rootScope.name = response.obj.name;
                        $cookies.put("id", response.obj.id);
                        $cookies.put("name", response.obj.name);
                        //$cookies.put("centreIdOption", 1);
                        $state.go('billbudgethead');
                    }
                    //$('#cover').hide();
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                });
        }
    };

});

