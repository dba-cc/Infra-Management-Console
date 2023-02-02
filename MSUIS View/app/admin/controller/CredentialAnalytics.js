app.controller('CredentialAnalyticsCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval, $timeout) {
    $scope.CredentialParams = new NgTableParams({}, {});
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

    $scope.$watch("CredentialParams.filter()", function (newFilter) {
        $timeout(function () {
            var filteredData = $scope.CredentialParams.data;
            $scope.generateChart(filteredData)
        });
    }, true);

    $scope.generateChart = function (data) {
        var loginNames = data.map(function (obj) {
            return obj.loginame.trim();
        });
        var noOfConnections = data.map(function (obj) {
            return obj.noofconnections;
        });
        var maxNoOfConnections = Math.max.apply(Math, data.map(function (obj) { return obj.noofconnections; }));
        var colors = data.map(function (obj) {
            return $scope.generateColor(obj.noofconnections, maxNoOfConnections);
        });
        const chartCanvas = document.getElementById('analytics-chart');
        const barChartCanvas = document.getElementById('analytics-chart-bar');
        if (typeof $scope.chart !== 'undefined') {
            $scope.chart.destroy();
            $scope.barChart.destroy();
        }
        $scope.chart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: loginNames,
                datasets: [{
                    label: ' # of Connections',
                    data: noOfConnections,
                    borderWidth: 5,
                    backgroundColor: colors,
                    borderColor: 'white',
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutoutPercentage: 50,
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
        $scope.barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: {
                labels: loginNames,
                datasets: [{
                    label: ' # of Connections',
                    data: noOfConnections,
                    borderWidth: 3,
                    backgroundColor: '#27bc1a3b',
                    borderColor: '#20bb40ad',
                    fill: true
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutoutPercentage: 30,
                plugins: {
                    filler: {
                        propagate: false,
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                },
                interaction: {
                    intersect: false,
                }
            }
        });
    }

    $scope.generateColor = function (noOfConnections, maxNoOfConnections) {
        var opacity = noOfConnections / maxNoOfConnections;
        var color = "rgba(22, 171, 57, " + opacity + ")";
        return color;
    }
});