app.controller('CredentialAnalyticsCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval) {

    $scope.GetCredentialAnalytics = function () {
        showLoadingScreen();
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
                    $scope.generateChart(response.obj);
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.generateChart = function (data) {
        var loginNames = data.map(function (obj) {
            return obj.loginame.trim();
        });
        var noOfConnections = data.map(function (obj) {
            return obj.noofconnections;
        });
        var totalNoOfConnections = data.reduce((acc, item) => acc + item.noofconnections, 0);
        var colors = data.map(function (obj) {
            return $scope.generateColor(obj.noofconnections, totalNoOfConnections);
        });
        const chart = document.getElementById('analytics-chart');

        new Chart(chart, {
            type: 'doughnut',
            data: {
                labels: loginNames,
                datasets: [{
                    label: ' # of Connections',
                    data: noOfConnections,
                    borderWidth: 1,
                    backgroundColor: colors,
                    borderColor: 'rgb(22, 171, 57)',
                }]
            },
            options: {
                maintainAspectRatio: false,
                //responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                   
                }
            }
        });
    }

    $scope.generateColor = function (noOfConnections, totalNoOfConnections) {
        var opacity = noOfConnections / totalNoOfConnections;
        var color = "rgba(22, 171, 57, " + opacity + ")";
        return color;
    }
});