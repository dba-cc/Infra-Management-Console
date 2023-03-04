app.controller('CredentialAnalyticsCtrl', function ($scope, $http, $rootScope, NgTableParams, $timeout) {
    $scope.CredentialParams = new NgTableParams({}, {});
    $scope.charttype = 'bar';
    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

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
            $scope.generateChart(filteredData, 'bar')
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
        if ($scope.chart) {
            $scope.chart.destroy();
        }
        console.log($scope.charttype)
        if ($scope.charttype == 'bar') {
            $scope.chart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: ' # of Connections',
                        data: noOfConnections,
                        borderWidth: 3,
                        backgroundColor: '#27bc1a3b',
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
        } else if ($scope.charttype == 'doughnut') {
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
        }
    }

    $scope.toggleChart = function () {
        document.getElementsByClassName('chart-item')[0].style.height = 'auto'
        if (document.getElementById('chart-parent').style.padding != '0px') {
            document.getElementById('chart-parent').style.padding = 0;
            $('#chart-parent').animate({
                height: "50px"
            });
            document.getElementsByClassName('down')[0].classList.add('up');
            document.getElementsByClassName('down')[0].classList.remove('down');
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '76vh';
        } else {
            document.getElementById('chart-parent').style.padding = '15px';
            $('#chart-parent').animate({
                height: "35vh"
            });
            document.getElementsByClassName('up')[0].classList.add('down');
            document.getElementsByClassName('up')[0].classList.remove('up');
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '46vh';
        }
        $('#left-element-set').fadeToggle();
    }

});