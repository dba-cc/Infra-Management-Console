app.controller('IndexingCtrl', function ($scope, $http, $rootScope, NgTableParams, $timeout) {
    $rootScope.pageTitle = "Index Analytics";
    //$scope.IndexParams = new NgTableParams({}, {});
    $scope.showIndexTableflag = false;

    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }
    $scope.dropdown = function () {
        $('#formatInputDiv').dropdown();
    }

    $scope.Percent = false;
    $scope.Sugg = false;
    $scope.changeType = function () {
        if ($scope.index_type == 'Percent') {
            $scope.Percent = true;
            $scope.Sugg = false;
            $scope.GetIndexPer();
        } else {
            $scope.Percent = false;
            $scope.Sugg = true;
            $scope.GetIndexSugg();
        }
    }

    $scope.resetAll = function () {
        $scope.Percent = false;
        $scope.Sugg = false;
        $scope.index_type = null;
        document.querySelectorAll('.ui.dropdown > .text')[1].innerText = 'Select Type'
    }

    $scope.$watch('IndexParams.filter()', function () {
        $timeout(function () {
            $('.ui.indicating.progress').progress();
        }, 500);
    }, true);

    $scope.getDatabaseList = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Database/GetDatabase',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.DatabaseList = {};
                }
                else {
                    $scope.DatabaseList = response.obj;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });

    };

    $scope.GetIndexPer = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetIndexPercentage',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {

                    $scope.IndexParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj,
                    });
                    showIndexTableflag = true
                    $timeout(function () {
                        $('.ui.indicating.progress').progress();
                    }, 500);
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }
    
    $scope.GetIndexSugg = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetIndexSuggestions',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.IndexSuggParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj,
                    });
                    showIndexTableflag = true
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }
});