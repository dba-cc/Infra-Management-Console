app.controller('UserLoginCtrl', function ($scope,$http, $state, $cookies) {
    $cookies.remove("id");

    $scope.loginObj = {};
    hideLoadingScreen();
    $scope.showPassword = false;
    $scope.message = ''
    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    };

    $scope.checklogindetails = function () {

        $http({
            method: 'POST',
            url: 'api/Settings/checklogin',
            data: '"' + $scope.loginObj.username + ' ' + $scope.loginObj.password +'"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.logindetails = {};
                }
                else {
                    
                    if (response.obj === "True") {
                        $state.go('dashboard')
                        localStorage.setItem('user', $scope.loginObj.username)
                    }
                    else {
                        $scope.message = 'Oops! Invalid username or password.'
                        $('#error-message').transition('fade in');
                    }
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.login = function () {
        if ($scope.loginObj.username === null || $scope.loginObj.username === undefined || $scope.loginObj.username === "" || $scope.loginObj.password === undefined || $scope.loginObj.password === null || $scope.loginObj.password === "") {
            $scope.message = 'Error! Username and password can\'t be empty.'
            $('#error-message').transition('fade in');
        } else {
            $scope.User = {};
            $scope.User.UserName = $scope.loginObj.username;
            $scope.User.UserPass = $scope.loginObj.password;

            $scope.checklogindetails()

           /* if ($scope.User.UserName == 'Admin' && $scope.User.UserPass == 'abc@123') {
                
            } else {
                $scope.message = 'Oops! Invalid username or password.'
                $('#error-message').transition('fade in');
            }*/
        }
    };
});