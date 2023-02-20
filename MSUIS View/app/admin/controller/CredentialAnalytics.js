app.controller('CredentialAnalyticsCtrl', function ($scope, $http, $rootScope, NgTableParams, $timeout) {
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
                        count: response.obj.length
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
        var noOfConnections = data.map(function (obj) {
            return obj.noofconnections;
        });
        var labels = data.map(function (obj) {
            return obj.loginame.trim() + ' - ' + obj.dbname.trim();
        });

        var colors = [
            "rgba(2, 152, 154, 0.3)", // blueishgreen 1
            "rgba(1, 205, 2, 0.3)", // green 1
            "rgba(19, 66, 172, 0.3)", // blue 1

            "rgba(53, 173, 174, 0.7)", // blueishgreen 2
            "rgba(54, 214, 53, 0.7)", // green 2
            "rgba(66, 102, 190, 0.7)", // blue 2

            "rgba(104, 195, 196, 1)", //blueishgreen 3
            "rgba(103, 225, 104, 1)", // green 3
            "rgba(130, 152, 184, 1)" // blue 3
        ]
        const chartCanvas = document.getElementById('analytics-chart');
        const barChartCanvas = document.getElementById('analytics-chart-bar');
        if (typeof $scope.chart !== 'undefined') {
            $scope.chart.destroy();
            $scope.barChart.destroy();
        }
        $scope.chart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: ' # of Connections',
                    data: noOfConnections,
                    borderWidth: 0,
                    backgroundColor: Object.values(colors),
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
                labels: labels,
                datasets: [{
                    label: ' # of Connections',
                    data: noOfConnections,
                    borderWidth: 3,
                    backgroundColor: colors,
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
});