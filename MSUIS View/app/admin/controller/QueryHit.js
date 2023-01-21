app.controller('QueryHitCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval) {


    $scope.dropdown = function() {
        $('.ui.dropdown').dropdown();
    }

    $scope.changeFormat = function () {
        document.getElementById('timeInput').placeholder = 'Number of ' + $scope.timeFormat + 's'
        document.getElementById('timeInputDiv').style.display = 'flex'
    }

    $scope.check = function () {
        if ($scope.query.querycount.$invalid) {
            $scope.Show = true;
        } else {
            $scope.Show = false;
            $scope.FetchQueryHitList();
        }

    };

    $scope.FetchQueryHitList = function () {
        if ($scope.time === undefined) {
            showMessage('Enter number of ' + $scope.timeFormat + 's to fetch queries!')
            return
        }
        hideLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: '"' + $scope.timeFormat + ' ' + $scope.time + '"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    showMessage(response.obj);
                }
                else {
                    $scope.QueryHitParams = new NgTableParams({
                    }, {
                        dataset: response.obj
                    });
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                showMessage(res.obj);
                hideLoadingScreen();
            });

    };
    $scope.initFetch = function () {
        hideLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: '"HOUR 1"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    showMessage(response.obj);
                }
                else {
                    $scope.QueryHitParams = new NgTableParams({
                    }, {
                        dataset: response.obj
                    });
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                showMessage(res.obj);
                hideLoadingScreen();
            });

    };
    $scope.showPopup = function (data) {
        $('#inputPopup').modal({
            context: '.parent-container'
        }).modal('show');
        document.getElementById('query').innerText = data
    }
    $scope.hidePopup = function () {
        $('#inputPopup').modal('hide');
    };
});