app.controller('UserLoginCtrl', function ($scope, $state, $cookies) {
    $cookies.remove("id");

    $scope.loginObj = {};

    $scope.showPassword = false;
    $scope.message = ''
    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    };

    $scope.login = function () {
        if ($scope.loginObj.username === null || $scope.loginObj.username === undefined || $scope.loginObj.username === "" || $scope.loginObj.password === undefined || $scope.loginObj.password === null || $scope.loginObj.password === "") {
            $scope.message = 'Error! Username and password can\'t be empty.'
            $('#error-message').transition('fade in');
        } else {
            $scope.User = {};
            $scope.User.UserName = $scope.loginObj.username;
            $scope.User.UserPass = $scope.loginObj.password;
            if ($scope.User.UserName == 'Admin' && $scope.User.UserPass == 'abc@123') {
                $state.go('dashboard')
            } else {
                $scope.message = 'Oops! Invalid username or password.'
                $('#error-message').transition('fade in');
            }
        }
    };
});