app.controller('InstituteCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Manage Institute";

    $scope.Institute1 = {};

    $scope.getInstitute = function () {

        var data = new Object();
        //data.id = $rootScope.id;
        console.log(data);
        $http({
            method: 'POST',
            url: 'api/Institute1/InstituteGet',
            data: data,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.Institute1TableParams = new NgTableParams({
                    }, {
                            dataset: response.obj
                    });
                    console.log(response.obj);
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    
    $scope.addInstitute = function () {

        //$scope.newUser.createdById = $rootScope.id;
        console.log($scope.Institute1);
        $http({
            method: 'POST',
            url: 'api/Institute1/InstituteAdd',
            data: $scope.Institute1,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.Institute1 = {};
                    $scope.getInstitute();
                    $state.go("InstituteEdit");
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    

    $scope.modifyInstituteData = function (data) {
       // debugger;
        alert("Hii");
        $scope.ShowFormFlag = true;
        $scope.Institute1 = data;
        
       // $(window).scrollTop(0); 
    }

    $scope.editInstitute = function () {
       // $scope.Institute1 = data;
        $http({
            method: 'POST',
            url: 'api/Institute1/InstituteEdit1',
            data: $scope.Institute1,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.ShowFormFlag = false;
                    $scope.getInstitute();
                    $scope.Institute1 = {};

                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.deleteInstitute = function (ev, data) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete?')
            .textContent('')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(function () {
            $scope.Institute1 = data;

            $http({
                method: 'POST',
                url: 'api/Institute1/InstituteDelete',
                data: $scope.Institute1,
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {

                    $rootScope.showLoading = false;
                    if (response.response_code == "0") {
                        $state.go('login');

                    } else if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    }
                    else {
                        alert(response.obj);
                        $scope.getInstitute();
                    }
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                });

        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.NewAddPage = function () {
        $state.go("InstituteAdd");
    }

    $scope.backToList = function () {
        $state.go("InstituteEdit");
    }
    
    

});