app.controller('UserLoginCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog) {

    $cookies.remove("id");

    $rootScope.showLoading = false;

    $scope.loginObj = {};

    $scope.showPassword = false;
    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    };

    $scope.login = function () {

        $rootScope.showLoading = false;

        if ($scope.loginObj.username === null || $scope.loginObj.username === undefined || $scope.loginObj.username === "" || $scope.loginObj.password === undefined || $scope.loginObj.password === null || $scope.loginObj.password === "") {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title("Error")
                    .textContent("Please enter Username and Password!")
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
            );
        }
        else {
            $scope.User = {};
            
            
            $scope.User.UserName = $scope.loginObj.username;
            $scope.User.UserPass = $scope.loginObj.password;
            if ($scope.User.UserName == 'Admin' && $scope.User.UserPass == 'abc@123') {
                $state.go('dashboard')
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title("Error")
                        .textContent("Invalid Username and Password!")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                );
            }
            
            //$http({
            //    method: 'POST',
            //    url: 'api/User/UserLogin',
            //    data: '"' + $scope.User.UserName + ' ' + $scope.User.UserPass + '"',
            //    headers: { "Content-Type": 'application/json' }
            //})
            //    .success(function (response) {
            //        $rootScope.showLoading = false;

            //        if (response.response_code != "200") {
            //            $mdDialog.show(
            //                $mdDialog.alert()
            //                    .parent(angular.element(document.querySelector('#popupContainer')))
            //                    .clickOutsideToClose(true)
            //                    .title("Error")
            //                    .textContent(response.obj)
            //                    .ariaLabel('Alert Dialog Demo')
            //                    .ok('Got it!')
            //            );
            //        }
            //        else {

            //            $rootScope.$broadcast('dialog', "Login Suuceesful", "alert", response.obj);

            //            $rootScope.id = response.obj.id;

            //            $cookies.put("id", response.obj.id);

            //            $state.go('users');

            //            $cookies.put("token", response.token);
            //        }
            //        //$('#cover').hide();
            //    })
            //    .error(function (res) {
            //        $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            //    });
        }
    };

});

